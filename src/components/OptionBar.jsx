import React, { Fragment, useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { setAppState } from '../redux/features/appStateSlice';
import { topDownAnimation } from '../configs/motion.config';

import { Options } from '../configs/constants.config';
import { boxShadows } from '../configs/theme.config';





const OptionBar = () => {
   const dispatch = useDispatch();
   const { appState } = useSelector((state) => state.appState);
   const [selectedTab, setSelectedTab] = useState(null);

   useEffect(() => {
      if (appState !== "") setSelectedTab(appState);
   }, [appState])

   const handleTabChange = (tab) => {
      setSelectedTab(tab.path);
      dispatch(setAppState(tab.path));
   }

   return (
      <motion.div
         {...topDownAnimation}
         className="z-50 fixed flex justify-center gap-2 w-full "
      >
         <nav
            className='option-bar-nav max-w-max  bg-white z-10  shadow-gray-600 rounded-md'
            style={{
               boxShadow: boxShadows.boxShadow1
            }}

         >
            <div className="flex flex-row justify-center items-center gap-2 ">
               {Options.map((option) => (
                  <Fragment key={option.value}>
                     <motion.div
                        whileHover={{
                           color: 'rgb(37,99,235)',
                           textShadow: '0 0 1px rgb(14 165 233)',
                           transition: { duration: 0.2 },
                        }}
                        onClick={() => handleTabChange(option)}
                        className="text-secondary p-3 relative flex flex-row items-center gap-2 cursor-pointer">
                        <Link to={option.path} className="flex items-center gap-2">
                           {option.icon}
                           <span className='text-sm capitalize select-none'>{option.name}</span>
                        </Link>
                        {(option.path === selectedTab && option.path === appState) && (
                           <motion.div
                              layoutId="underline"
                              className="underline-active-tab absolute m-auto
                              bottom-0.5 px-1 h-px bg-blue-600 rounded-md  w-4/5 left-0 right-0 "  />
                        )}
                     </motion.div>
                  </Fragment>
               ))}
            </div>
         </nav>
      </motion.div>
   )
}

export default OptionBar;
