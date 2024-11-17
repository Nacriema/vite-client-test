import React, { Fragment, useState } from 'react';
import { boxShadows } from '../configs/theme.config';
import { TbEdit } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";


import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAppState } from '../redux/features/appStateSlice';


import { motion } from 'framer-motion';
import { fadeAnimation, topDownAnimation } from '../configs/motion.config'

// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const IdeasList = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);




  const handleCloseIdeasCollection = () => {
    dispatch(setAppState(""));
    navigate('/');
  }

  const handleRemoveIdeaItem = () => {

    alert('Remove Idea Item');
  }




  return (
    <Fragment>
      <div className=' z-30 mx-auto max-w-5xl mt-16 px-10 overflow-y-auto'>
        <div className='idea_action_buttons sticky flex flex-row items-center w-full '>
          {isEditing ? (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className='btn-primary px-4 py-2 left-0 min-w-24 flex flex-row items-center justify-between'
              style={{
                boxShadow: boxShadows.boxShadow1
              }}>
              <IoMdDoneAll className='text-xl mr-2' />
              <span className='text-sm capitalize'>Done</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className='btn-primary min-w-24 px-4 py-2 left-0 flex flex-row items-center justify-between'
              style={{
                boxShadow: boxShadows.boxShadow1
              }}>
              <TbEdit className='text-xl mr-2' />
              <span className='text-sm capitalize'>Edit</span>
            </button>
          )}

          <h1 className='flex-1 text-base text-center capitalize p-4'>view and edit your saved ideas</h1>

          <button
            onClick={handleCloseIdeasCollection}
            className='right-0  px-1 py-1 bg-primaryBg text-white '
            style={{
              boxShadow: boxShadows.boxShadow1
            }}>
            <IoCloseOutline className='text-xl' />
          </button>
        </div>



        {/**Generate the idea item */}
        <Swiper
          direction='horizontal'
          slidesPerView={3}
          pagination={{ clickable: true }}
          className='idea_swiper_container w-full h-96 grid grid-cols-4 gap-2 idea-container mt-10'
        >

          <SwiperSlide className='ideal_item max-w-72 px-3 mt-6 w-72 relative mx-auto' >

            <div className='idea_item_content w-full p-2' style={{
              boxShadow: boxShadows.boxShadow1
            }}>

              {isEditing && (
                <motion.button {...fadeAnimation}
                  onClick={handleRemoveIdeaItem}
                  className='absolute top-4 right-10 bg-slate-50 p-1 rounded-sm' style={{
                    boxShadow: boxShadows.boxShadow1
                  }}>
                  <RiDeleteBin6Line className='text-xl text-secondary' />
                </motion.button>
              )}
              <div className='w-full h-40'
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />

              {/**Color choices */}
              <motion.div {...topDownAnimation} className='idea_colors_palette flex flex-row justify-around  mt-4'>
                <div className='idea_color_1 h-6 w-7 border-zinc-950 bg-red-500'></div>
                <div className='idea_color_2 h-6 w-7 border-zinc-950 bg-blue-500'></div>
                <div className='idea_color_3 h-6 w-7 border-zinc-950 bg-green-500'></div>
                <div className='idea_color_4 h-6 w-7 border-zinc-950 bg-yellow-500'></div>
                <div className='idea_color_5 h-6 w-7 border-zinc-950 bg-purple-950'></div>
                <div className='idea_color_6 h-6 w-7 border-zinc-950 bg-purple-50'></div>
                <div className='idea_color_7 h-6 w-7 border-zinc-950 bg-purple-950'></div>
                <div className='idea_color_8 h-6 w-7 border-zinc-950 bg-purple-500'></div>
              </motion.div>
              {/**Color choices */}

              {/**Wood floor choices */}

              <motion.div  {...topDownAnimation} className='idea_wood_floors flex flex-row justify-around  mt-4'>
                <div className='w-7 h-6' style={{

                  backgroundImage: `url(https://images.unsplash.com/photo-1621295693450-080546d2ec8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'

                }}></div>
                <div className='w-7 h-6' style={{

                  backgroundImage: `url(https://images.unsplash.com/photo-1621295693450-080546d2ec8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'

                }}></div>
                <div className='w-7 h-6' style={{

                  backgroundImage: `url(https://images.unsplash.com/photo-1621295693450-080546d2ec8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'

                }}></div>
                <div className='w-7 h-6' style={{

                  backgroundImage: `url(https://images.unsplash.com/photo-1621295693450-080546d2ec8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'

                }}></div>
                <div className='w-7 h-6' style={{

                  backgroundImage: `url(https://images.unsplash.com/photo-1621295693450-080546d2ec8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'

                }}></div>
                <div className='w-7 h-6' style={{

                  backgroundImage: `url(https://images.unsplash.com/photo-1621295693450-080546d2ec8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'

                }}></div>
                <div className='w-7 h-6' style={{

                  backgroundImage: `url(https://images.unsplash.com/photo-1621295693450-080546d2ec8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'

                }}></div>
                <div className='w-7 h-6' style={{

                  backgroundImage: `url(https://images.unsplash.com/photo-1621295693450-080546d2ec8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'

                }}></div>
              </motion.div>

              {/**Wood floor choices */}

              {/**wallpaper choices */}

              <motion.div className='idea_wall_papers flex flex-row justify-around  mt-4'>
                <div className='w-7 h-6' style={{

                  backgroundImage: `url(https://images.unsplash.com/photo-1621295693450-080546d2ec8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'

                }}></div>
                <div className='w-7 h-6' style={{

                  backgroundImage: `url(https://images.unsplash.com/photo-1621295693450-080546d2ec8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'

                }}></div>
                <div className='w-7 h-6' style={{

                  backgroundImage: `url(https://images.unsplash.com/photo-1621295693450-080546d2ec8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'

                }}></div>
                <div className='w-7 h-6' style={{

                  backgroundImage: `url(https://images.unsplash.com/photo-1621295693450-080546d2ec8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'

                }}></div>
                <div className='w-7 h-6' style={{

                  backgroundImage: `url(https://images.unsplash.com/photo-1621295693450-080546d2ec8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'

                }}></div>
                <div className='w-7 h-6' style={{

                  backgroundImage: `url(https://images.unsplash.com/photo-1621295693450-080546d2ec8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'

                }}></div>
                <div className='w-7 h-6' style={{

                  backgroundImage: `url(https://images.unsplash.com/photo-1621295693450-080546d2ec8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'

                }}></div>
                <div className='w-7 h-6' style={{

                  backgroundImage: `url(https://images.unsplash.com/photo-1621295693450-080546d2ec8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'

                }}></div>
              </motion.div>

            </div>

            <motion.div  {...topDownAnimation} className='idea_item_title' style={{
              backgroundColor: 'rgba(0,0,0,0.2)'
            }}>
              <h3 className='text-center capitalize  py-2 text-sm'>Living Room Idea</h3>

            </motion.div>



          </SwiperSlide>



        </Swiper>

      </div>

    </Fragment >
  );
};

export default IdeasList;




