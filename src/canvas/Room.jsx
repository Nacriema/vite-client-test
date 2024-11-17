/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useCallback, useEffect, useRef, useState } from "react";
import { TextureLoader, BoxGeometry, MeshBasicMaterial, CanvasTexture, BackSide, ClampToEdgeWrapping  } from 'three';
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { RepeatWrapping, LinearMipMapLinearFilter, sRGBEncoding, NearestFilter } from 'three';
import { useLoader } from '@react-three/fiber';
import { convertFace, outImgToXYZ, shimImgData, clippingImage } from '../utils/Room.utils';


// eslint-disable-next-line react/prop-types
export const Room = ({ roomType }) => {

     const groupRef = useRef();
     const [materials, setMaterials] = useState([]);

     useCallback(() => {
          useGLTF.preload("living_room_model.glb");
     }, []);

     // const { scene } = useGLTF('/living_room_model.glb');
     // const dispatch = useDispatch();
     // const { camera } = useThree();
     // const groupRef = useRef();
     // const [focusMesh, setFocusMesh] = useState(null);
     // const { colorPicked } = useSelector((state) => state.paletteColors);

     // const texture = useLoader(TextureLoader, '/src/assets/textures/image.png');

     // texture.wrapS = RepeatWrapping;
     // texture.wrapT = RepeatWrapping;
     // texture.repeat.set(20, 20);
     // texture.magFilter = NearestFilter;
     // texture.minFilter = LinearMipMapLinearFilter;
     // texture.anisotropy = 30;
     // texture.encoding = sRGBEncoding;
     // texture.flipY = false;
     // texture.unpackAlignment = 4;

     const map360DegImageToModel = useCallback((url) => {
          const img = new Image();
          img.crossOrigin = "anonymous"; // Handle cross-origin images

          img.onload = function () {
               const canvas = document.createElement("canvas");
               const ctx = canvas.getContext("2d");
               canvas.width = img.width;
               canvas.height = img.height;
               ctx.drawImage(img, 0, 0);

               const imgData = ctx.getImageData(0, 0, img.width, img.height);
               const faceSize = 900; 

               const faceTextures = [];
               for (let i = 0; i < 6; i++) {
                    const faceCanvas = convertFace(imgData, i, faceSize);
                    const texture = new CanvasTexture(faceCanvas);
                    texture.wrapS = ClampToEdgeWrapping;
                    texture.wrapT = ClampToEdgeWrapping;
                    texture.magFilter = NearestFilter;
                    texture.minFilter = LinearMipMapLinearFilter;
                    texture.encoding = sRGBEncoding;
                    faceTextures.push(texture);
               }

               setMaterials(faceTextures.map(texture => new MeshBasicMaterial({ map: texture, side: 1 })));
          };

          img.src = url;
     }, []);

     useEffect(() => {
          // Map the 360 image to the cube when component mounts
          map360DegImageToModel("/src/assets/textures/bathroom.jpg");
     }, [map360DegImageToModel]);

     
     useFrame(() => {
          // if (groupRef.current) {
          //      groupRef.current.rotation.y +Y= 0.01;
          // }
     });

     // const handleFocusMesh = useCallback((mesh) => {

     //      console.log("" + mesh)
     //      const mousePosition = {
     //           x: (mesh.clientX / window.innerWidth) * 2 - 1,
     //           y: -(mesh.clientY / window.innerHeight) * 2 + 1,
     //      };

     //      const raycaster = new Raycaster();
     //      raycaster.setFromCamera(mousePosition, camera);

     //      const intersects = raycaster.intersectObjects(scene.children, true);

     //      if (intersects.length > 0) {
     //           const intersect = intersects[0];
     //           const clickmesh = intersect.object;

     //           clickmesh.material.map = texture;
     //           clickmesh.material.needsUpdate = true;

     //           // const targetPosition = intersect.point;

     //           // camera.position.copy(targetPosition);

     //           camera.lookAt(intersect.face.normal);

     //           setFocusMesh(intersect.object);
     //      }
     // }, [camera, scene]);


     // const attachClickHandlers = useCallback((object) => {
     //      if (object && object.type === "Mesh") {
     //           object.onClick = () => handleFocusMesh(object);
     //      } else if (object && object.children) {
     //           object.children.forEach(attachClickHandlers);
     //      }
     // }, [handleFocusMesh]);

     // useEffect(() => {
     //      if (scene) {
     //           dispatch(setGlobalLoading(false));
     //      }
     // }, [scene, dispatch]);

     // useEffect(() => {
     //      attachClickHandlers(groupRef.current);
     //      const currentGroupRef = groupRef.current;

     //      return () => {
     //           currentGroupRef.traverse((child) => {
     //                if (child && child.type === "Mesh") {
     //                     delete child.onClick;
     //                }
     //           });
     //      }
     // }, [attachClickHandlers]);

     // useFrame((state, delta) => {
     //      if (focusMesh) {
     //           easing.dampC(
     //                focusMesh.material.color, colorPicked, 0.3, delta
     //           );
     //      }
     // });


     return (
          <group ref={groupRef} onDoubleClick={() => console.log("This onclcide")}  >
               {materials.length > 0 && (
                    <mesh>
                         <boxGeometry args={[1, 1, 1]} />
                         {materials.map((material, index) => (
                              <meshBasicMaterial key={index} attach={`material-${index}`} map={material.map} side={BackSide} />
                         ))}
                    </mesh>
               )}
          </group>
     );
}

// {scene && <primitive object={scene} position={[0, 0, 0]} scale={[1, 1, 1]} />}
// tu anh 360 chua detech => map no vao trong model 