
import { motion } from 'framer-motion'

import { IoColorFilterSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

import { background, boxShadows } from '../configs/theme.config';

const SubNav = ({ navOptions, picked, handlePicker, ...rest }) => {


   return (

      <div className=' flex flex-row w-fit relative mx-auto justify-around items-center gap-1 rounded-lg py-0.5 ' style={background} >
         <div className="live-palette-header relative -left-0.5 flex flex-row min-w-36  items-center justify-between bg-primaryBg px-3 py-3"
            style={{
               boxShadows: boxShadows.boxShadow1
            }}>
            <IoColorFilterSharp style={{ fontSize: '1.2rem', color: '#fff' }} />
            <span className="text-sm flex-1 text-primary w-fit text-center select-none">
               {navOptions.title}</span>
         </div>
         {
            navOptions.colorFamilies.map((color, index) => (
               <motion.button
                  key={index}
                  onClick={() => handlePicker(color.value)}
                  whileHover={{
                     color: 'rgb(37,99,235)',
                     textShadow: '0 0 1px rgb(14 165 233)',
                     width: '100px',
                     transition: { duration: 0.2 }
                  }}
                  className='btn-primary text-secondary relative text-sm capitalize px-2 py-2 rounded-lg cursor-pointer select-none'
               >
                  {color.name}
                  {picked === color.value && (
                     <motion.div
                        className="underline-active-tab_color absolute m-auto
                 bottom-0.5 px-1 h-px bg-blue-600 rounded-md  left-0 right-0 " layoutId="underline-tab_color" />
                  )}
               </motion.button>
            ))}

         <motion.div
            className='flex items-center w-fit justify-center btn-primary rounded-lg text-secondary text-sm capitalize pl-2 pr-4 cursor-pointer'
            animate={rest.isExpanded ? "expanded" : "collapsed"}
            initial="collapsed"
            variants={{
               collapsed: { width: 'max-content' },
               expanded: { width: 'max-content' }
            }}
            exit={{
               transition: { duration: 0.4 }
            }}
         >
            <motion.input
               type='text'
               variants={{
                  collapsed: { opacity: 0, width: 0, display: 'none' },
                  expanded: { opacity: 1, width: '200px', display: 'block' }
               }}
               onKeyUp={(e) => console.log(e.target.value)}
               transition={{ duration: 0.2 }}
               className=" w-full rounded-lg border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset"
               placeholder='Search color'
            />
            <IoIosSearch style={{ fontSize: '1.4rem', marginLeft: '4px' }} onClick={() => rest.setIsExpanded(!rest.isExpanded)} />
         </motion.div>
      </div>

   )
}

export default SubNav
