import { useState, useEffect } from 'react'
import axios from 'axios'
import { HiX, HiFire, HiArrowLeft, HiArrowRight } from 'react-icons/hi'

const App = () => {
  const [data, setData] = useState([])
  const [url, setUrl] = useState('https://api.blady.dev/data')
  const [status, setStatus] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setStatus(false)
    const getData = url => {
      axios
        .get(url, {
          headers: {
            'api-key': 'F1R2A3N4E5K' // Ustawienie nagłówka 'api-key'
          }
        })
        .then(res => {
          setData(res.data.data)
          setTotalPages(res.data.totalPages) // Ustawienie liczby stron
          setStatus(true)
        })
        .catch(err => {
          console.log(err)
        })
    }

    const getDataCat = () => {
      axios.get('https://api.blady.dev/tags').then(res => {
        setCategories(res.data.tagPool)
      })
    }
    getDataCat()

    getData(url)
  }, [url])

  const CloseMenuHandler = () => {
    setIsMenuOpen(false)
  }

  const ChangeCategory = name => {
    let formattedName = name.replace(/ /g, '+')
    setCategory(name)
    setCurrentPage(1)
    setIsMenuOpen(false)
  }

  const resetCategory = () => {
    setCategory('')
    setCurrentPage(1)
    setUrl(
      `https://api.blady.dev/data?${category && 'tag=' + category}&page=${
        currentPage || 1
      }`
    )
    setIsMenuOpen(false)
  }

  const changePage = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  useEffect(() => {
    const changeUrl = () => {
      setUrl(
        `https://api.blady.dev/data?${category && 'tag=' + category}&page=${
          currentPage || 1
        }`
      )
    }

    changeUrl()
  }, [category, currentPage])

  return (
    <div className='bg-[#212121fa] text-white uppercase font-bold w-screen h-full'>
      {isMenuOpen ? (
        <div className='w-screen h-screen left-0 top-0 flex flex-wrap bg-[#212121fa] sticky z-40'>
          <div className=' w-full h-full'>
            <span className='group bg-white ease-in-out duration-500 hover:bg-black p-4 rounded-full absolute ml-[50%] top-10'>
              <HiX
                className='text-black text-4xl  group-hover:text-red-600 cursor-pointer'
                onClick={() => CloseMenuHandler()}
              />
            </span>
            <span className='p-8 text-2xl'>Kategorie:</span>
            <ul className='flex flex-wrap gap-2 justify-center items-center p-40'>
              <li
                onClick={() => resetCategory()}
                className='hover:underline cursor-pointer selection:bg-inherit'
              >
                Wszystkie Kategorie |
              </li>
              {categories.map((cat, i) => (
                <li
                  className='hover:underline cursor-pointer selection:bg-inherit'
                  key={cat.id}
                  onClick={() => ChangeCategory(cat)}
                >
                  {cat} |
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsMenuOpen(true)}
          className='sticky px-8 py-4 left-0 top-0 bg-red-600 hover:bg-red-500 '
        >
          Kategorie
        </button>
      )}
      <div className='h-full w-full'>
        <header>
          <center>
            <h1 className='text-4xl p-4'>Knotz.Link</h1>
          </center>
          <p className='text-white text-2xl text-center m-12'>
            {!category === '' ? 'Kategoria:' : ''} {category}
          </p>
        </header>
        <main className='flex'>
          <div className='flex flex-wrap px-8 my-16 gap-6 justify-center'>
            {status ? (
              data.map(
                ({
                  id,
                  title,
                  description,
                  url,
                  time_added,
                  read_time,
                  word_count,
                  tags
                }) => (
                  <>
                    {title && (
                      <div
                        className='w-2/5 text-center text-black bg-red-400 p-8 rounded-xl shadow-lg flex flex-col justify-around items-center relative'
                        key={id}
                      >
                        <h2 className='text-xl'>{title && title}</h2>
                        <p className='text-sm mt-4 mb-8'>
                          {description && description}
                        </p>
                        <div className='flex justify-between items-center mt-8 font-mono text-xs w-[60%] gap-4 absolute left-4 bottom-2'>
                          <span className='font-light'>
                            Dodano{' '}
                            <p>
                              {new Date(
                                time_added * 1000
                              ).toLocaleTimeString() +
                                ' ' +
                                new Date(
                                  time_added * 1000
                                ).toLocaleDateString()}
                            </p>
                          </span>
                          <span>
                            {word_count && word_count !== '0' ? (
                              <p>{word_count} słów</p>
                            ) : (
                              ''
                            )}
                          </span>
                          <span>
                            {read_time && read_time !== '0' ? (
                              <p>Czas czytania około {read_time} min</p>
                            ) : (
                              ''
                            )}
                          </span>
                        </div>
                        <span className='absolute right-0 bottom-0'>
                          <a
                            href={url}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <button className='bg-red-600 px-8 py-3 shadow-lg rounded-br-lg text-slate-200 hover:text-white hover:bg-red-500'>
                              Czytaj
                            </button>
                          </a>
                        </span>
                      </div>
                    )}
                  </>
                )
              )
            ) : (
              <span className='w-screen'>
                <HiFire className='text-white text-9xl mx-auto my-40 animate-bounce' />
              </span>
            )}
          </div>
        </main>
        <section>
          <div className='flex justify-center items-center gap-4 m-12 '>
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <HiArrowLeft className='text-2xl cursor-pointer hover:opacity-70' />
            </button>
            <span className='bg-red-600 text-black p-4 rounded-full'>
              Strona {currentPage} z {totalPages}
            </span>
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='hover:underline'
            >
              <HiArrowRight className='text-2xl cursor-pointer hover:opacity-70' />
            </button>
          </div>
        </section>
        <footer>
          <center>
            <h1>Knotz.link</h1>
          </center>
        </footer>
      </div>
    </div>
  )
}

export default App
