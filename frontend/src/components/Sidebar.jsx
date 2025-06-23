import { motion } from 'framer-motion'
import React from 'react'


const Sidebar = () => {
  return (
    <motion.div initial={{x:-50}} animate={{x:0}} exit={{x:-50}} className='absolute top-0 bottom-0 left-0 w-[60%] text-2xl grid grid-rows-20 p-8 bg-green-500 text-white border-r-2 '>
      <p className='font-bold row-span-2 '>Home</p>
      <div className='row-span-16 grid grid-rows-16'>
        <p className='row-span-1 '>signup</p>
        <p className='row-span-1 '>login</p>
        <p className='row-span-1 '>logout</p>
        <p className='row-span-10'></p>
      </div>
      <p className='row-span-2'>Dark Mode</p>
    </motion.div>
  )
}

export default Sidebar
