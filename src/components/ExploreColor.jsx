import { motion, AnimatePresence } from 'framer-motion'
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ColorFamily, ColorCollections } from '../configs/constants.config';
import { background, boxShadows, textLine } from '../configs/theme.config';

import { IoColorFilterSharp, IoCloseOutline, IoAddCircleOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoColorPaletteOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

import { fadeAnimation } from '../configs/motion.config';

import { setAppState } from '../redux/features/appStateSlice';
import { setOpenColorDetailModal, setPaletteColors } from '../redux/features/paletteColorSlice';
import { setColorPicked } from '../redux/features/paletteColorSlice';
import { checkValidArrayLength, checkColorAlreadyAdded } from '../utils/ColorPalette.utils';
import SubNav from './SubNav';


const ExploreColor = () => {

  const { paletteColors } = useSelector((state) => state.paletteColors);
  const [isExpanded, setIsExpanded] = useState(false);

  const [filteredCollectionColor, setFilteredCollectionColor] = useState([]);
  const [colorFamilySelected, setColorFamilySelected] = useState(ColorFamily.colorFamilies[0].value);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const filterCollection = async () => {
      const filtered = await filterCollectionByColorFamily(colorFamilySelected);
      setFilteredCollectionColor(filtered);
    }
    filterCollection();
  }, [colorFamilySelected]);


  const filterCollectionByColorFamily = async (colorFamily) => {
    return ColorCollections.filter((collection) => collection.family === colorFamily);
  }

  const handleColorFamilySelected = async (color) => {
    setColorFamilySelected(color);
    const filtered = await filterCollectionByColorFamily(color);
    setFilteredCollectionColor(filtered);
  }

  const handleColorDetail = ({ collectionId, colorId }) => {
    dispatch(setColorPicked(filteredCollectionColor[collectionId].colors[colorId]));
    dispatch(setOpenColorDetailModal(true));
  }

  const handleCloseTab = () => {
    dispatch(setAppState(""));
    navigate('/');
  }

  const handleAddColorPalette = (color) => {
    if (checkValidArrayLength(paletteColors))
      checkColorAlreadyAdded(paletteColors, color) ? alert('Color already added') : dispatch(setPaletteColors([...paletteColors, color]));
    else alert('Palette is full');
  };


  return (
    <Fragment>
      <div className='fixed z-30 top-16 max-w-7xl left-1/2 -translate-x-1/2'>

    
      <SubNav
      navOptions={ColorFamily}
      isExpanded={isExpanded}
      picked={colorFamilySelected}
      setIsExpanded={setIsExpanded}
      handlePicker={handleColorFamilySelected}
    />

        {/*Grid color follow by color family */}
        <AnimatePresence mode='wait'>
          <motion.div {...fadeAnimation} className='z-50 top-44 mt-10 w-full py-4 px-4' style={{ ...background }} >

            <button
              onClick={handleCloseTab}
              className='absolute -right-4 top-20 flex flex-row bg-primaryBg items-center px-1 py-1 justify-center'>
              <IoCloseOutline style={{ fontSize: '1.2rem', color: "#fff" }} />
            </button>

            <div className="grid grid-cols-3 gap-6">
              {filteredCollectionColor.map((collection, idx) => (
                <motion.div key={idx} className="grid grid-cols-6 gap-y-0.5">
                  {collection.colors.map((color, index) => (
                    <motion.div
                      key={index}
                      whileHover={{
                        zIndex: 100,
                        width: '110px',
                        height: '110px',
                        transition: { duration: 0.3 },
                        boxShadow: boxShadows.boxShadow2
                      }}
                      className="h-10 w-10 border-x border-y  border-gray-100 border-solid overflow-visible "
                      style={{ backgroundColor: color.hex, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className='flex flex-col  h-full w-full justify-between text-secondary text-sm capitalize px-2 py-2 cursor-pointer'
                      >
                        <div className='flex flex-col justify-between items-center'>

                          <span style={{
                            textShadow: 'rgb(14, 165, 233) 0px 0px 0px'
                          }}>{color.hex}</span>
                          <span style={{ textLine }}>{color.name}</span>
                        </div>

                        <div className='button-color-group flex flex-row justify-between items-center'>

                          {checkColorAlreadyAdded(paletteColors, color.hex) ? (
                            <button className='btn-primary px-1 py-1 bg-slate-100 rounded-full'>
                              <FaCheck style={{ fontSize: '1rem' }} />
                            </button>
                          ) : (
                            <button className='btn-primary px-1 py-1 bg-slate-100 rounded-full'
                              onClick={() => handleAddColorPalette(color.hex)}>
                              <IoAddCircleOutline style={{ fontSize: '1.2rem' }} />
                            </button>
                          )}

                          <button className='btn-primary px-1 py-1 bg-slate-100 rounded-full' onClick={() => handleColorDetail({ collectionId: idx, colorId: index })}>
                            <IoColorPaletteOutline style={{ fontSize: '1.2rem' }} />
                          </button>

                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Fragment>
  );
};

export default ExploreColor;
