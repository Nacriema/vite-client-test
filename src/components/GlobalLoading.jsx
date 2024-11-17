import { Fragment, useEffect, useState, React } from "react";
import { useSelector } from "react-redux";
import { HashLoader } from 'react-spinners';
import { SiLoopback } from "react-icons/si";

const GlobalLoading = () => {
   const { globalLoading } = useSelector((state) => state.globalLoading);

   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if (globalLoading) {
         setIsLoading(true);
      } else {
         setTimeout(() => {
            setIsLoading(false);
         }, 2000)
      }
   }, [globalLoading]);

   return (
      <Fragment>
         {isLoading && (
            <div
               className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-50 flex justify-center items-center
                  flex flex-col justify-center items-center
               "
            >
               <HashLoader
                  color="#36d7b7"
                  loading
                  size={60}
                  css={'display: block; margin: 0 auto; bg-color: transparent;'}
               />
               <div className="flex flex-row flex-wrap justify-around items-center mt-3">
                  <SiLoopback fontSize={"3.4rem"} color="#fff" className="mr-2" />
                  <span className="text-3xl text-primary font-bold" style={{ textShadow: '1px 1px 3px #000' }}>CoLux</span>
               </div>
            </div>
         )}

      </Fragment>
   )
}

export default GlobalLoading
