import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";


const Dolly = () => {

   const dollyRef = useRef();

   useFrame(({ state, delta }) => {
      if(dollyRef.current) {
         const targetPosition = new Vector3(0, 0, 0);
         const currentPosition = dollyRef.current.position;
         const distance = targetPosition.distanceTo(currentPosition);
         const direction = new Vector3().subVectors(targetPosition, currentPosition).normalize();
         const speed = 0.1;
         const step = speed * delta;
         const newPosition = currentPosition.add(direction.multiplyScalar(step));
         dollyRef.current.position.set(newPosition.x, newPosition.y, newPosition.z);
         if (distance < 0.1) {
            dollyRef.current.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
         }
      }
   });


  return (
    <group>
      
    </group>
  )
}

export default Dolly
