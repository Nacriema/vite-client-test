import React, { Fragment, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { background, boxShadows } from '../configs/theme.config';
import { RoomList } from '../configs/constants.config';
import { SiLootcrate } from "react-icons/si";

const RoomPicker = () => {

  const [selectedRoom, setSelectedRoom] = useState();

  useEffect(() => {
    setSelectedRoom(RoomList[0].value);
  }, [])


  const handleSelectedRoom = (room) => {
    console.log(room);
    setSelectedRoom(room);
  }


  return (
    <Fragment>
      <div className='fixed z-30 top-16 max-w-7xl left-1/2 -translate-x-1/2'>
        <div
          className=' flex flex-row w-fit relative mx-auto justify-around items-center gap-1 rounded-lg py-0.5 '
          style={{
            boxShadows: boxShadows.boxShadow1
          }} >
          <div className="live-palette-header relative -left-0.5 flex flex-row min-w-36  items-center justify-between bg-primaryBg px-3 py-3"
            style={{
              boxShadows: boxShadows.boxShadow1
            }}>
            <SiLootcrate style={{ fontSize: '1.2rem', color: '#fff' }} />
            <span className="text-sm flex-1 text-primary w-fit text-center">
              3D Models</span>
          </div>
          {
            RoomList.map((room, index) => (
              <motion.button
                key={index}
                onClick={() => handleSelectedRoom(room.value)}
                whileHover={{
                  color: 'rgb(37,99,235)',
                  textShadow: '0 0 1px rgb(14 165 233)',
                  width: '130px',
                  transition: { duration: 0.2 }
                }}
                className='btn-primary text-secondary relative text-sm capitalize px-2 py-2 rounded-lg cursor-pointer'
              >
                {room.name}
                {selectedRoom === room.value && (
                  <motion.div
                    className="underline-active-tab_color absolute m-auto
                    bottom-0.5 px-1 h-px bg-blue-600 rounded-md  left-0 right-0 " layoutId="underline-tab_color" />
                )}
              </motion.button>
            ))}
        </div>
      </div>

    </Fragment>
  );
};

export default RoomPicker;
