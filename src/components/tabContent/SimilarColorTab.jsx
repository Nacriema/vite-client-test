import { AnimatePresence, motion } from 'framer-motion'
import React from 'react';

const SimilarColorTab = () => {
   return (
      <div>
         <AnimatePresence mode="wait">
            <motion.div
               initial={{ y: 10, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -10, opacity: 0 }}
               transition={{ duration: 0.2 }}
               className="tab-content w-full mt-1  py-1 px-1  flex flex-row flex-wrap gap-0.5 items-center"
            >
               <div className="w-16 h-16" style={{ background: 'red' }}>
               </div>
            </motion.div>
         </AnimatePresence>
      </div>
   )
}

export default SimilarColorTab
