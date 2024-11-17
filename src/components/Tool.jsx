import { useContext, useEffect, useRef, useState } from "react";
import * as THREE from 'three'; // Import Three.js library
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls
import AppContextCanvas from "./hooks/createContextCanvas";
import { convertFace, pointCubeToPointImage, convertCoordinate } from '../utils/Room.utils';

// import { ToolProps } from "./helpers/Interfaces";
import * as _ from "underscore";
import { useSelector } from "react-redux";

const Tool = ({ handleMouseMove }) => {
  const {
    clicks: [, setClicks],
    image: [image],
    maskCanvas: [maskCanvas, setMaskCanvas],
  } = useContext(AppContextCanvas);

  const { colorPicked } = useSelector((state) => state.paletteColors);

  const hexToRgb = (hex) => {
    // Loại bỏ ký tự '#' nếu có
    hex = hex.replace(/^#/, '');

    // Chuyển đổi mã màu hex thành giá trị RGB
    let bigint = parseInt(hex, 16);
    let r = ((bigint >> 16) & 255);
    let g = ((bigint >> 8) & 255);
    let b = (bigint & 255);

    return { r, g, b };
  };
  const colorPickedRgb = hexToRgb(colorPicked);
  const [shouldFitToWidth, setShouldFitToWidth] = useState(true);
  const bodyEl = document.body;

  const maskCanvasRef = useRef(null);
  const cubeRef = useRef(null);
  // const imgRef = useRef<HTMLImageElement>(null); // Reference for the img element

  const [maskFaces, setMaskFaces] = useState([]);
  const [faces, setFaces] = useState([]);
  const [previousMaskCanvas, setPreviousMaskCanvas] = useState(null);

  const previousMaskCanvasRef = useRef(null);
  useEffect(() => {
    if (previousMaskCanvas && previousMaskCanvasRef.current) {
      const ctx = previousMaskCanvasRef.current.getContext("2d");
      previousMaskCanvasRef.current.width = previousMaskCanvas.width;
      previousMaskCanvasRef.current.height = previousMaskCanvas.height;
      ctx.drawImage(previousMaskCanvas, 0, 0); // Vẽ previousMaskCanvas vào ref
      console.log("previousMaskCanvasRef", ctx);

    }
  }, [previousMaskCanvas]);

  useEffect(() => {
    const maskFace = [];

    if (maskCanvas && maskCanvasRef.current) {
      const canvas = maskCanvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width = maskCanvas.width;
      canvas.height = maskCanvas.height;
      if (ctx) {
        if (previousMaskCanvas) {

          ctx.drawImage(previousMaskCanvas, 0, 0, previousMaskCanvas.width, previousMaskCanvas.height);
        }

        ctx.drawImage(maskCanvas, 0, 0, maskCanvas.width, maskCanvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Loop through each pixel in the image data
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];      // Red
          const g = data[i + 1];  // Green
          const b = data[i + 2];  // Blue

          if (r === 0 && g === 0 && b === 0) {
            data[i] = 0;      // Red
            data[i + 1] = 0;  // Green
            data[i + 2] = 0;  // Blue
            data[i + 3] = 0; // Set alpha to fully opaque (not transparent)  // Alpha = 255 (giữ nguyên)
          }
          else if (r === 0 && g === 114 && b === 189) {
            data[i] = colorPickedRgb.r;      // Red
            data[i + 1] = colorPickedRgb.g;  // Green
            data[i + 2] = colorPickedRgb.b;  // Blue
            data[i + 3] = 255; // Alpha = 0 (trong suốt)
          }
          else {
            data[i] = r;      // Red
            data[i + 1] = g;  // Green
            data[i + 2] = b;  // Blue
            data[i + 3] = 255; // Set alpha to fully opaque (not transparent)  // Alpha = 255 (giữ nguyên)
          }
        }

        // Update the image data back into the canvas
        ctx.putImageData(imageData, 0, 0);
        // Sau đó chia nhỏ canvas thành các phần 6 mặt của cube
        for (let i = 0; i < 6; i++) {
          maskFace.push(convertMask(imageData, i, 512));
        }
        console.log("maskFaces", maskFace);
        setMaskFaces(maskFace);

        const newCombinedCanvas = document.createElement("canvas");
        newCombinedCanvas.width = canvas.width;
        newCombinedCanvas.height = canvas.height;
        const newCtx = newCombinedCanvas.getContext("2d");
        newCtx.drawImage(canvas, 0, 0);
        const imageDataCombine = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const dataCombine = imageDataCombine.data;

        // Loop through each pixel in the image data
        for (let i = 0; i < dataCombine.length; i += 4) {
          const r = dataCombine[i];      // Red
          const g = dataCombine[i + 1];  // Green
          const b = dataCombine[i + 2];  // Blue
          if (r === 0 && g === 0 && b === 0) {
            dataCombine[i] = 0;      // Red
            dataCombine[i + 1] = 0;  // Green
            dataCombine[i + 2] = 0;  // Blue
            dataCombine[i + 3] = 0; // Set alpha to fully opaque (not transparent)  // Alpha = 255 (giữ nguyên)
          }
          else {
            dataCombine[i] = r;      // Red
            dataCombine[i + 1] = g;  // Green
            dataCombine[i + 2] = b;  // Blue
            dataCombine[i + 3] = 255; // Set alpha to fully opaque (not transparent)  // Alpha = 255 (giữ nguyên)
          }
        }
        // Update the image data back into the canvas
        newCtx.putImageData(imageDataCombine, 0, 0);
        setPreviousMaskCanvas(newCombinedCanvas);
      }
    }
  }, [maskCanvas]);


  useEffect(() => {
    load360ImageAndDisplayOnCube(image?.src);
    fitToPage();
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === bodyEl) {
          fitToPage();
        }
      }
    });
    resizeObserver.observe(bodyEl);
    return () => {
      resizeObserver.unobserve(bodyEl);
    };
  }, [image]);

  useEffect(() => {
    const updateMaterials = () => {
      if (!cubeRef.current) return;

      const updatedMaterials = maskFaces.map((maskFace, index) => {
        const texture = new THREE.CanvasTexture(faces[index]);
        let maskTexture = null;

        if (maskFace) {
          maskTexture = new THREE.CanvasTexture(maskFace);
        }

        return new THREE.ShaderMaterial({
          uniforms: {
            map: { value: texture },
            maskTexture: { value: maskTexture },
            colorPick: { value: new THREE.Color(colorPickedRgb.r / 255.0, colorPickedRgb.g / 255.0, colorPickedRgb.b / 255.0) }
          },
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          side: THREE.BackSide,
        });
      });

      cubeRef.current.material = updatedMaterials;
      cubeRef.current.material.needsUpdate = true;
    };

    updateMaterials();
  }, [maskFaces]);

  const fitToPage = () => {
    if (!image) return;
    const imageAspectRatio = image.width / image.height;
    const screenAspectRatio = window.innerWidth / window.innerHeight;
    setShouldFitToWidth(imageAspectRatio > screenAspectRatio);
  };

  // New function to convert mask similar to convertFace
  function convertMask(
    maskData,
    faceIdx,
    faceSize
  ) {
    return convertFace(maskData, faceIdx, faceSize); // You can reuse the same logic here
  }

  const load360ImageAndDisplayOnCube = (url) => {
    console.log("Loading 360 Image and display on Cube");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width = img.width;
      canvas.height = img.height;
      console.log(`Canvas width: ${canvas.width}; heigh: ${canvas.height}`);
      const faces = [];

      if (ctx) {
        ctx?.drawImage(img, 0, 0);
        var imageData = ctx?.getImageData(0, 0, img.width, img.height);
        const faceSize = 512;
        const data = imageData.data;
        const x = 0; // Toạ độ x
        const y = 0; // Toạ độ y

        // Tính toán chỉ số của pixel trong mảng dữ liệu
        const index = (y * canvas.width + x) * 4; // Mỗi pixel có 4 giá trị (RGBA)
        const r = data[index];     // Giá trị Red
        const g = data[index + 1]; // Giá trị Green
        const b = data[index + 2]; // Giá trị Blue
        const a = data[index + 3]; // Giá trị Alpha

        console.log(`Màu tại (${x}, ${y}): R=${r}, G=${g}, B=${b}, A=${a}`);
        // Loop through each pixel in the image data
        for (let i = 0; i < data.length; i += 4) {
          // Giữ lại màu sắc của pixel
          const r = data[i];      // Red
          const g = data[i + 1];  // Green
          const b = data[i + 2];  // Blue

          // Đặt alpha cho tất cả các pixel thành 255 (không trong suốt)
          data[i + 3] = 255; // Alpha = 255 (không trong suốt)
        }

        // Update the image data back into the canvas
        ctx.putImageData(imageData, 0, 0);

        // Sau đó chia nhỏ canvas thành các phần 6 mặt của cube
        for (let i = 0; i < 6; i++) {
          faces.push(convertFace(imageData, i, faceSize));
        }
        setFaces(faces);
        console.log('faces', maskFaces);
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.zIndex = '10';
      document.body.appendChild(renderer.domElement);
      const geometry = new THREE.BoxGeometry(50, 50, 50);
      const initialMaterials = faces.map((faceCanvas, index) => new THREE.ShaderMaterial({
        uniforms: {
          map: { value: new THREE.CanvasTexture(faceCanvas) },
          maskTexture: { value: maskFaces[index] ? new THREE.CanvasTexture(maskFaces[index]) : null },
          colorPick: { value: new THREE.Color(colorPickedRgb.r / 255.0, colorPickedRgb.g / 255.0, colorPickedRgb.b / 255.0) }

        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide,
      }));
      console.log(initialMaterials.map((material) => material.uniforms.colorPick));

      const cube = new THREE.Mesh(geometry, initialMaterials);
      cubeRef.current = cube;
      scene.add(cube);

      camera.position.z = 2;
      const controls = new OrbitControls(camera, renderer.domElement);

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      // Mouse click handler
      const handleMouseClick = (event) => {
        const rect = renderer.domElement.getBoundingClientRect();

        // Normalize the mouse position to [-1, 1] (clip space)
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Cast a ray from the camera through the mouse position
        raycaster.setFromCamera(mouse, camera);

        // Check if the ray intersects any objects (3D models)
        const intersects = raycaster.intersectObjects(scene.children);

        if (!intersects[0]) {
          console.log("No object hit !!!");
          return;
        }

        // NOTE: Just for debug, note that the FaceSize = 512, faceID = 0 mean click at the Door. 
        // Nice, this is correct !!!

        // NICE
        // uv face is located at the bottom right of the face (when user inside the cube), 
        // x is the width and y is the height of the cube
        const uv = intersects[0].uv;
        console.log(`2D Hit point UV coordinates on 2D face: ${uv.x}, ${uv.y}`);

        // Convert the uv point to the 2D coordinate of the point, need to use a tools for the conversion purpose
        const { point_x, point_y } = convertCoordinate(uv.x, uv.y, 512);

        /// TODO: Need to get the pixel coordinate of the image where the user click on ranging 0 -> 511
        const { x, y } = pointCubeToPointImage(point_x, point_y, intersects[0].face.materialIndex, 512, imageData);
        setClicks([{ x, y, clickType: 1 }]);
      };
      // Add event listener for mouse clicks
      renderer.domElement.addEventListener('click', handleMouseClick);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    };
    img.src = url;
  };

  return (
    <>
      {maskCanvas && (
        <>
          <canvas
            ref={maskCanvasRef}
            style={{ zIndex: 11 }}
            className={`${shouldFitToWidth ? "w-full" : "h-full"} hidden pointer-events-none`}
          ></canvas>

        </>
      )}

    </>
  );
};

const fragmentShader = `
uniform vec3 colorPick;
uniform sampler2D map; // Texture của mặt cube
uniform sampler2D maskTexture; // Mask (alpha map)
varying vec2 vUv; // Tọa độ UV

void main() {
  vec4 color = texture2D(map, vUv); // Lấy màu từ texture chính
  vec4 mask = texture2D(maskTexture, vUv); // Lấy giá trị mask

  vec3 targetColor = vec3(0.0,0.0,0.0); // Chuyển đổi sang tỷ lệ 0.0 đến 1.0

float threshold = 0.3;

  if (distance(mask.rgb, colorPick) < threshold) {
    gl_FragColor = vec4(colorPick, 1.0); 
  } 
  else if (distance(mask.rgb, targetColor) >= threshold) {
    gl_FragColor = vec4(mask.rgb, 1.0); 
  } 
  else {
    gl_FragColor = vec4(color.rgb, color.a);
  }

  // Bỏ qua các pixel có độ trong suốt thấp
  if (gl_FragColor.a < 0.1) discard; // Bỏ qua pixel có alpha nhỏ
}
`;
const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv; // Lưu trữ tọa độ UV để truyền vào fragment shader

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export default Tool;
