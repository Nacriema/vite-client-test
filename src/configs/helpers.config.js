export const exportImage  = () => {
   const canvas = document.getElementById('canvas');
   const dataURL = canvas.toDataURL();
   const link = document.createElement('a');

   link.href = dataURL;
   link.download = 'production.png';
   link.click();
   document.body.removeChild(link);
};
