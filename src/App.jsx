import react, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [data, setData] = useState([])
  const [url, setUrl] = useState(
    'https://getpocket-knotz-link-api.onrender.com/'
  )
  const [status, setStatus] = useState(false)

  useEffect(() => {
    // setTimeout(() => {
    axios
      .get(url)
      .then(res => {
        setData(res.data)
        setStatus(true)
      })
      .catch(err => {
        console.log(err)
      })
    // }, 5000)
  }, [])

  data.map(content => console.log(content))
  // console.log()

  return (
    <div className='bg-[#212121fa] text-white uppercase font-bold w-screen h-full'>
      <header>
        <center>
          <h1 className='text-4xl p-4'>Knotz.Link</h1>
        </center>
      </header>
      <main className='flex'>

        <ul className='flex flex-wrap px-8 my-16 gap-6 justify-center'>
          {status ? (
            data.map(({ item_id, resolved_title, excerpt, given_url }) => (
              <li
                className='w-[480px] text-center text-black bg-red-400 p-8 rounded-xl shadow-lg'
                key={item_id}
              >
                <h2>
                  {resolved_title
                    ? resolved_title
                    : excerpt
                    ? excerpt
                    : 'brak opisu'}
                </h2>
                {/* <p>{excerpt}</p> */}
                <a href={given_url} target='_blank'>
                  <button className='bg-red-600 px-4 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-red-500'>
                    Czytaj
                  </button>
                </a>
              </li>
            ))
          ) : (
            <h1>Loading</h1>
          )}
        </ul>
      </main>
      <footer>
        <center>
          <h1>Knotz.link</h1>
        </center>
      </footer>
    </div>
  )
}

export default App
