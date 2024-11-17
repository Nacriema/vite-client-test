const convertFace = (imgIn, faceIdx, faceSize) => {
   var inPix = shimImgData(imgIn),
      faceCanvas = document.createElement("canvas"),
      faceCtx = faceCanvas.getContext("2d"),
      faceImgData = faceCtx.createImageData(faceSize, faceSize),
      outPix = shimImgData(faceImgData),
      pi = Math.PI,
      pi_2 = pi / 2;

   faceCanvas.width = faceSize;
   faceCanvas.height = faceSize;

   for (var xOut = 0; xOut < faceSize; xOut++) {
      for (var yOut = 0; yOut < faceSize; yOut++) {
         var xyz = outImgToXYZ(xOut, yOut, faceIdx, faceSize);
         var theta = Math.atan2(xyz.y, xyz.x); // range -pi to pi
         var r = Math.hypot(xyz.x, xyz.y);
         var phi = Math.atan2(xyz.z, r); // range -pi/2 to pi/2

         // source image coordinates
         var uf = (0.5 * imgIn.width * (theta + pi)) / pi;
         var vf = (0.5 * imgIn.width * (pi_2 - phi)) / pi;

         // Bilinear interpolation
         var ui = Math.floor(uf);
         var vi = Math.floor(vf);
         var u2 = ui + 1;
         var v2 = vi + 1;
         var mu = uf - ui;
         var nu = vf - vi;

         // Pixel values of four corners
         var A = inPix.getPx(
            ui % imgIn.width,
            clippingImage(vi, 0, imgIn.height - 1)
         );
         var B = inPix.getPx(
            u2 % imgIn.width,
            clippingImage(vi, 0, imgIn.height - 1)
         );
         var C = inPix.getPx(
            ui % imgIn.width,
            clippingImage(v2, 0, imgIn.height - 1)
         );
         var D = inPix.getPx(
            u2 % imgIn.width,
            clippingImage(v2, 0, imgIn.height - 1)
         );

         // Interpolation
         var rgb = {
            r:
               A[0] * (1 - mu) * (1 - nu) +
               B[0] * mu * (1 - nu) +
               C[0] * (1 - mu) * nu +
               D[0] * mu * nu,
            g:
               A[1] * (1 - mu) * (1 - nu) +
               B[1] * mu * (1 - nu) +
               C[1] * (1 - mu) * nu +
               D[1] * mu * nu,
            b:
               A[2] * (1 - mu) * (1 - nu) +
               B[2] * mu * (1 - nu) +
               C[2] * (1 - mu) * nu +
               D[2] * mu * nu,
         };

         rgb.r = Math.round(rgb.r);
         rgb.g = Math.round(rgb.g);
         rgb.b = Math.round(rgb.b);

         outPix.setPx(xOut, yOut, rgb);
      }
   }

   faceCtx.putImageData(faceImgData, 0, 0);
   return faceCanvas;
}

// @huytm function that can detect the pixel from the 
const pointCubeToPointImage = (pointX, pointY, faceIdx, faceSize, imgIn) => {
   var pi = Math.PI,
      pi_2 = pi / 2;

   // Function that can trace back the 2D coordinate of the image after feed back the
   var xyz = outImgToXYZ(pointX, pointY, faceIdx, faceSize);
   var theta = Math.atan2(xyz.y, xyz.x); // range -pi to pi
   var r = Math.hypot(xyz.x, xyz.y);
   var phi = Math.atan2(xyz.z, r); // range -pi/2 to pi/2

   // source image coordinates
   var uf = (0.5 * imgIn.width * (theta + pi)) / pi;
   var vf = (0.5 * imgIn.width * (pi_2 - phi)) / pi;

   console.log(`2D corresponding point for (${pointX}, ${pointY}): (${uf}, ${vf})`);
   return {
      x: uf, 
      y: vf
   };
}

const convertCoordinate = (uv_x, uv_y, faceSize) => {
   return {
      point_x: uv_x * faceSize,
      point_y: (1 - uv_y) * faceSize
   }
}

// Convert output image pixel to XYZ coordinates
const outImgToXYZ = (i, j, faceIdx, faceSize) => {
   var a = (2 * i) / faceSize,
      b = (2 * j) / faceSize;

   switch (faceIdx) {
      case 0:
         return { x: 1 - a, y: 1, z: 1 - b }; // left
      case 1:
         return { x: a - 1, y: -1, z: 1 - b }; // right
      case 2:
         return { x: b - 1, y: a - 1, z: 1 }; // top
      case 3:
         return { x: 1 - b, y: a - 1, z: -1 }; // bottom
      case 4:
         return { x: 1, y: a - 1, z: 1 - b }; // front
      case 5:
         return { x: -1, y: 1 - a, z: 1 - b }; // back
   }
}

// Helper function to get and set pixel data
const shimImgData = (imgData) => {
   var w = imgData.width * 4,
      d = imgData.data;

   return {
      getPx: function (x, y) {
         x = x * 4 + y * w;
         return [d[x], d[x + 1], d[x + 2]];
      },
      setPx: function (x, y, rgb) {
         x = x * 4 + y * w;
         d[x] = rgb.r;
         d[x + 1] = rgb.g;
         d[x + 2] = rgb.b;
         d[x + 3] = 255; // alpha
      },
   };
}

// Clipping helper function
const clippingImage = (val, min, max) => {
   return val < min ? min : val > max ? max : val;
}

// Main function to load a 360 image and display it on a cube map
// Function to export the scene to GLB
// Exporter
// const exporter = GLTFExporter();


// Listen for the "E" key press
//    window.addEventListener("keydown", (event) => {
//       if (event.key === "e" || event.key === "E") {
//            exportGLB();
//       }
//  });

// function exportGLB() {
//    exporter.parse(
//         scene,
//         function (result) {
//              const blob = new Blob([result], {
//                   type: "application/octet-stream",
//              });
//              const url = URL.createObjectURL(blob);
//              const a = document.createElement("a");
//              a.href = url;
//              a.download = "scene.glb";
//              document.body.appendChild(a);
//              a.click();
//              document.body.removeChild(a);
//              URL.revokeObjectURL(url);
//         },
//         { binary: true }
//    );
// }

// @huytm: Need a function that can 

export { convertFace, outImgToXYZ, shimImgData, clippingImage, pointCubeToPointImage, convertCoordinate };