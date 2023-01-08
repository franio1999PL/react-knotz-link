import { HiX } from 'react-icons/hi'

import { Tablica } from './kategorie'

const Categories = isOpen => {
  return (
    <div className=' w-full h-full'>
      <span className='bg-white p-4 rounded-full absolute ml-[50%] top-10'>
        <HiX
          className='text-black text-4xl  hover:text-red-600 cursor-pointer'
          onClick={() => isOpen.CloseMenuHandler()}
        />
      </span>
      <span>Categories:</span>
      <ul className='flex flex-wrap gap-2 justify-center items-center p-40'>
        {Tablica.map((category, i) => (
          <li
            className='hover:underline cursor-pointer selection:bg-inherit'
            key={i}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
