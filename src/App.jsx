import react, { useState, useEffect } from 'react'
import axios from 'axios'
import Categories from './Categories'
import { Tablica } from './kategorie'
import { HiX, HiFire } from 'react-icons/hi'

const App = () => {
  const [data, setData] = useState([])
  const [url, setUrl] = useState('https://api.blady.dev/data')
  const [status, setStatus] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [countOfItems, setCountOfItems] = useState(1000)
  const [category, setCategory] = useState('')

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
      setData(res.data);
      setStatus(true);
    })
    .catch(err => {
      console.log(err);
    });
};

getData(url);
  }, [url])

  const CloseMenuHandler = () => {
    setIsMenuOpen(false)
  }

  const ChangeCategory = name => {
    let formattedName = name.replace(/ /g, '+')
    setCategory(formattedName)
    // console.log(category)
    setIsMenuOpen(false)
  }

  const resetCategory = () => {
    setUrl('https://api.superapi.pl')
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const changeUrl = () => {
      setUrl(
        `https://api.superapi.pl/categories?tag=${category}&count=${countOfItems}`
      )
    }

    changeUrl()
  }, [category])

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
              {Tablica.map((cat, i) => (
                <li
                  className='hover:underline cursor-pointer selection:bg-inherit'
                  key={i}
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
                            {word_count && word_count != '0' ? (
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
                          {/* <span>
                      Tags:
                      {tags.map(tag =>
                        tag.map(({ item_id, tag }) => (
                          <p key={item_id}>{tag}</p>
                        ))
                      )}
                    </span> */}
                        </div>
                        <span className='absolute right-0 bottom-0'>
                          <a href={url} target='_blank'>
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
