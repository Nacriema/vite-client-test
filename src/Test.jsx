import { InferenceSession, Tensor } from "onnxruntime-web";
import { useContext, useEffect, useState } from "react";
import { handleImageScale } from "./components/helpers/scaleHelper";
import { onnxMaskToCanvas } from "./components/helpers/maskUtils";
import { modelData } from "./components/helpers/onnxModelAPI";
import Stage from "./components/Stage";
import AppContextCanvas from "./components/hooks/createContextCanvas";
// import AppContext from "./components/hooks/createContext";
/* @ts-ignore */
import npyjs from "npyjs";
import axios from 'axios';

const Test = () => {
  const {
    clicks: [clicks],
    image: [image, setImage],
    maskCanvas: [, setMaskCanvas],
  } = useContext(AppContextCanvas);
  const [model, setModel] = useState(null); // ONNX model
  const [tensor, setTensor] = useState(null); // Image embedding tensor

  // The ONNX model expects the input to be rescaled to 1024. 
  // The modelScale state variable keeps track of the scale values.
  const [modelScale, setModelScale] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = response.data;
      let npLoader = new npyjs();
      const npArray = await npLoader.load(data.image_embedding_url);
      const tensor = new Tensor('float32', npArray.data, npArray.shape);
      setTensor(tensor);

      // Tạo ONNX model từ dữ liệu nhị phân
      const modell = await InferenceSession.create(data.onnx_model_url);
      setModel(modell);
      console.log("MODEL", model);

      // Tải ảnh từ đường dẫn trả về
      const img = new Image();
      img.src = data.image_url;
      img.onload = () => {
        const { height, width, samScale } = handleImageScale(img);
        setModelScale({
          height: height,  // original image height
          width: width,  // original image width
          samScale: samScale, // scaling factor for image which has been resized to longest side 1024
        });
        img.width = width;
        img.height = height;
        setImage(img);
      };

      setMessage('Upload successful!');
    } catch (error) {
      setMessage('Upload failed.');
      console.error(error);
    }
  };


  // Run the ONNX model every time clicks has changed
  useEffect(() => {
    runONNX();
  }, [clicks]);

  const runONNX = async () => {
    try {
      if (
        model === null ||
        clicks === null ||
        tensor === null ||
        modelScale === null
      )
        return;
      else {
        const feeds = modelData({
          clicks,
          tensor,
          modelScale,
        });
        if (feeds === undefined) return;
        // Run the SAM ONNX model with the feeds returned from modelData()
        const results = await model.run(feeds);
        const output = results[model.outputNames[0]];
        setMaskCanvas(onnxMaskToCanvas(output.data, output.dims[2], output.dims[3]));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <>
    {!image && (<>
      <form onSubmit={handleSubmit} style={{ paddingTop: '50px' }}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </>
    )}
    <Stage />
  </>
    ;
}

export default Test;