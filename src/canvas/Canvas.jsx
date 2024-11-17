/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber'
import { Center, Environment, OrbitControls } from '@react-three/drei'
import { Room } from './Room';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';


export const Model = ({ position = [0, 0, 1], fov = 75 }) => {

     const { globalLoading } = useSelector(state => state.globalLoading);
     const dispatch = useDispatch();

     useEffect(() => {
          if (globalLoading) {
               setTimeout(() => {
                    dispatch(setGlobalLoading(false));
               }, 1000);
          }
     }, [dispatch, globalLoading]);

     return (
          <Canvas
               id='canvas-model'
               className='canvas-model'
               shadows
               camera={{ position, fov }}
               gl={{ preserveDrawingBuffer: true }}
               eventSource={document.getElementById('canvas-model')}
               eventPrefix="client"
          >
               <OrbitControls />
               <Environment preset="warehouse" />
               <Center >
                    <Room />
               </Center>
          </Canvas>
     )
}




// function Backdrop() {
//      const shadows = useRef();

//      useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))
//      return (
//           <AccumulativeShadows ref={shadows}
//                temporal
//                frames={60}
//                alphaTest={0.85}
//                scale={10} rotation={[Math.PI / 2, 0, 0]}
//                position={[0, 0, -0.14]}
//           >
//                <RandomizedLight amount={4}
//                     radius={9}
//                     intensity={0.95}
//                     ambient={0.25}
//                     position={[5, 5, -10]} />

//                <RandomizedLight amount={4}
//                     radius={5}
//                     intensity={0.95}
//                     ambient={0.55}
//                     position={[-5, 5, -9]} />
//           </AccumulativeShadows>
//      )
// }



// function Shirt(props) {
//      const snap = useSnapshot(state)
//      const texture = useTexture(`/${snap.decal}.png`)
//      const { nodes, materials } = useGLTF('/shirt_baked.glb');

//      useFrame((state, delta) => easing.dampC(
//           materials.lambert1.color,
//           snap.color, 0.7, delta)
//      );

//      return (
//           <mesh castShadow geometry={nodes.T_Shirt_male.geometry}
//                material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
//                <Decal position={[0, 0.01, 0.2]} rotation={[0, 0, 0]} scale={0.15} map={texture} />
//           </mesh>
//      )
// }


// useGLTF.preload('/shirt_baked.glb');
// ['/react.png', '/threejs.png'].forEach(useTexture.preload)
