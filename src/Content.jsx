import React from 'react'

const Content = data => {
  //   const { item_id, has_image, given_url, resolved_title, excerpt } = data

  return (
    <div className='flex flex-col p-1 bg-red-500 w-[20%] h-[20%]'>
      <h1>test</h1>
      <p>{data.item_id}</p>
      <p>{data.has_image}</p>
      <p>{data.given_url}</p>
      <p>{data.resolved_title}</p>
      <p>{data.excerpt}</p>
    </div>
  )
}

export default Content
