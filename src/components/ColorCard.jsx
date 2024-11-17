import { motion } from 'framer-motion'
import { AiOutlineDelete } from "react-icons/ai";
import { bottomUpAnimation } from '../configs/motion.config';
import { IoColorPaletteOutline } from "react-icons/io5";


const ColorCard = ({ color, selectedColor, ...rest }) => {

   const handleRemoveColorPalette = (color) => {
      rest.handleRemoveColorPalette(color);
   }

   
   return (
      <motion.div
         key={color}
         className={'live-palette__color-item min-w-28 overflow-hidden cursor-pointer rounded-md'}
         style={{ background: color }}
         onClick={(e) => rest.handleColorSelection(e, color)}
      >
         {selectedColor === color && (
            <motion.div {...bottomUpAnimation} className='flex flex-col flex-wrap justify-between w-56'>
               <div
                  className="live-palette__color-item-details flex flex-row justify-between items-center px-4 pt-2">

                  <span className="text-white text-sm text-secondary text-left uppercase select-none">{color}</span>

                  <button className='btn-primary px-1 py-1 bg-slate-100 rounded-full'>
                     <IoColorPaletteOutline className='color_detail_icon' style={{ fontSize: '1.1rem' }} />
                  </button>
               </div>

               <div
                  className="live-palette__color-item-details flex flex-row justify-between items-center px-4 py-2 ">
                  <p className='text-secondary text-sm text-left font-[800] pt-1 select-none'> Rejuvenate</p>

                  <button className='btn-primary  px-1 py-1 bg-slate-100  rounded-full' onClick={() => handleRemoveColorPalette(color)}>
                     <AiOutlineDelete className='color_delete_icon' style={{ fontSize: '1.1rem' }} />
                  </button>
               </div>
            </motion.div>
         )}
      </motion.div>
   );
};

export default ColorCard;
