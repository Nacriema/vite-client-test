import React, { Fragment, useState, useRef, useEffect, useCallback } from "react";
import { ModalTabs } from "../configs/constants.config";
import { background } from "../configs/theme.config";
import { motion, } from "framer-motion";
import { IoAddCircleOutline } from "react-icons/io5";
import CoordinateColorTab from "./tabContent/CoordinateColorTab";
import SimilarColorTab from "./tabContent/SimilarColorTab";
import DetailColorTab from "./tabContent/DetailColorTab";
import { useSelector } from "react-redux";
import { setOpenColorDetailModal, setPaletteColors } from "../redux/features/paletteColorSlice";
import { useDispatch } from "react-redux";
import { checkValidArrayLength, checkColorAlreadyAdded } from "../utils/ColorPalette.utils";
import { FaCheck } from "react-icons/fa6";

const ColorDetailModal = () => {

   const [activeTab, setActiveTab] = useState(ModalTabs[0].name);
   const { paletteColors, colorPicked, openColorDetailModal } = useSelector((state) => state.paletteColors);

   const dispatch = useDispatch();
   const modalRef = useRef(null);

   const handleClickOutside = useCallback((event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
         dispatch(setOpenColorDetailModal(false));
         setActiveTab(ModalTabs[0].name);
      }
   }, [dispatch]);

   const handleAddColorPalette = (color) => {
      if (checkValidArrayLength(paletteColors))
         checkColorAlreadyAdded(paletteColors, color) ? alert('Color already added') : dispatch(setPaletteColors([...paletteColors, color]));
      else alert('Palette is full');
   }

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [handleClickOutside]);

   const generateContentTab = () => {
      switch (activeTab) {
         case 'Coordinating colors':
            return <CoordinateColorTab color={colorPicked} />;
         case 'Similar colors':
            return <SimilarColorTab color={colorPicked} />;
         case 'Details':
            return <DetailColorTab color={colorPicked} />;
         default:
            return null;
      }
   }

   return (
      <Fragment>
         {
            openColorDetailModal && (
               <div className="w-screen h-screen absolute z-50" style={{ background: 'rgba(0,0,0,0.6' }}>

                  <div ref={modalRef} className="flex flex-row flex-wrap absolute z-50 w-2/3 h-1/2 top-32 left-1/2 -translate-x-1/2"
                     style={{
                        ...background, boxShadow: " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
                     }}>
                     <div className="color-details flex flex-col w-2/3">
                        <div className="px-4 py-10 flex flex-row bg-slate-400 " style={{ background: colorPicked.hex }}>
                           <div className="w-2/3">
                              <h2 className="text-sm text-secondary select-none">{colorPicked.hex}</h2>
                              <p className="text-secondary text-lg font-[800] select-none">{colorPicked.name}</p>
                              <p className="text-secondary text-sm capitalize select-none">Interior/ Exterior</p>
                              <p className="text-secondary text-sm capitalize select-none">Locator Number: 120-C4</p>
                           </div>
                           <motion.button
                              onClick={() => handleAddColorPalette(colorPicked.hex)}
                              whileHover={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
                              className="flex flex-col justify-center flex-1 items-center px-4">

                              {checkColorAlreadyAdded(paletteColors, colorPicked.hex) ? <FaCheck fontSize={'2rem'} /> :
                               <IoAddCircleOutline fontSize={'2rem'} />}

                              <span className="text-sm text-secondary mt-4 select-none">Add to palette</span>
                           </motion.button>
                        </div>

                        <motion.div className="modal-tab flex flex-row flex-wrap  items-center text-center">
                           {ModalTabs.map((tab, idx) => (
                              <button
                                 key={idx}
                                 className="modal-tab-btn relative flex-1 px-4 select-none py-2 text-center text-sm"
                                 onClick={() => setActiveTab(tab.name)}
                                 style={{
                                    background: activeTab === tab.name ? 'transparent' : colorPicked.hex,
                                 }}>
                                 {tab.name}
                                 {activeTab === tab.name && (
                                    <motion.div
                                       className="underline-active-tab_color absolute m-auto w-2/3
                                          bottom-0.5 px-1 h-px bg-blue-600 rounded-md  left-0 right-0 " layoutId="underline-tab_color" />
                                 )}
                              </button>
                           ))}
                        </motion.div>

                        {generateContentTab()}

                     </div>

                     <div className="w-1/3" style={{ background: '#ebebeb' }}>
                        <h1 className="text-center px-2 py-4 font-bold select-none">{'Color Preview'}</h1>
                        <div className="color-preview-slider">
                        </div>
                     </div>
                  </div >
               </div>
            )
         }
      </Fragment>
   )
}

export default ColorDetailModal
