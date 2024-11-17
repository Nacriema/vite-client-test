import React, { Fragment } from 'react';
import { AnimatePresence, motion } from 'framer-motion';



const DetailColorTab = () => {
   return (
      <Fragment>
         <AnimatePresence mode="wait">
            <motion.div
               initial={{ y: 10, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -10, opacity: 0 }}
               transition={{ duration: 0.2 }}
               className="tab-content w-full mt-1  py-2 px-1 flex flex-row flex-wrap gap-0.5 "
            >
               <ul className="color-details px-4 w-1/2">
                  <li className="flex flex-row justify-between mt-2">
                     <span className="text-secondary text-sm font-bold pr-4 select-none">Color Family: </span>
                     <span className="text-secondary text-sm select-none">Red</span>
                  </li>
                  <li className="flex flex-row justify-between mt-2">
                     <span className="text-secondary text-sm font-bold pr-4 select-none">RGB: </span>
                     <span className="text-secondary text-sm select-none">R: 231 G: 123, B: 43</span>
                  </li>
                  <li className="flex flex-row justify-between mt-2">
                     <span className="text-secondary text-sm font-bold pr-4 select-none">Hex Value: </span>
                     <span className="text-secondary text-sm select-none">#22345</span>
                  </li>

                  <li className="flex flex-row justify-between mt-2">
                     <span className="text-secondary text-sm font-bold pr-4 select-none">LRV:  </span>
                     <span className="text-secondary text-sm select-none">40</span>

                  </li>
                  <li className="flex flex-row justify-between mt-2">
                     <span className="text-secondary text-sm font-bold pr-4 select-none">Locator number:</span>
                     <span className="text-secondary text-sm select-none">120-C4</span>
                  </li>
               </ul>

               <ul className="color-details px-4">
                  <li className="flex flex-row justify-between mt-2">
                     <span className="text-secondary text-sm font-bold pr-4 select-none">Collections: </span>
                     <span className="text-secondary text-sm select-none">ABCs and 123s</span>
                  </li>
               </ul>
            </motion.div>
         </AnimatePresence>
      </Fragment>
   )
}

export default DetailColorTab
