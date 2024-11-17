import { boxShadows } from "../configs/theme.config"
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";

const SampleFloorPicked = () => {
  return (
    <div
    style={{ zIndex:11 }}
      className="fixed  top-16 w-60 left-4 max-h-96"
    >
      <div className="sample-floor-picked-container">

        <div className="sample-floor-picked-header pt-4 pb-4">
          <p className="text-md">
            Your Selected Floor
          </p>
        </div>


        <div className="sample-list">
          <div
            className="sample-list-item flex flex-row items-center gap-2 p-2 rounded-lg mb-2 cursor-pointer
            border-2 border-gray-400 border-dashed hover:border-secondaryBg hover:shadow-lg transition duration-300 ease-in-out"
          >
            <div className="sample-list-item-image w-14 h-14" style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1611072337226-1140ab367200?q=80&w=1988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              boxShadow: boxShadows.boxShadow1
            }} />

            <div className="sample-list-item-content flex flex-col flex-1 items-start " >
              <span className="text-sm  text-primaryBg">Sample 1</span>
              <span className="text-sm  text-primaryBg">Sample 1</span>
            </div>
            <button className='btn-primary  p-1 bg-slate-100  rounded-full border-dashed border-2 border-gray-700' >
              <AiOutlineDelete className='color_delete_icon' style={{ fontSize: '1.1rem' }} />
            </button>
          </div>


          <div
            className="sample-list-item flex flex-row items-center justify-center gap-2 p-2 rounded-lg mb-2 cursor-pointer
          border-2 border-gray-400 border-dashed hover:border-secondaryBg hover:shadow-lg transition duration-300 ease-in-out"
          >
            <IoAddCircleOutline style={{ fontSize: '1.4rem' }} />
            <span className="text-sm">Add Sample Floor</span>
          </div>

        </div>


      </div>
    </div>
  )
}

export default SampleFloorPicked
