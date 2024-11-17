// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.

// This source code is licensed under the license found in the
// LICENSE file in the root directory of this source tree.

import  { useState } from "react";
// import { modelInputProps } from "../helpers/Interfaces";
import AppContextCanvas from "./createContextCanvas";

const AppContextCanvasProvider = (props) => {
  const [clicks, setClicks] = useState(null);
  const [image, setImage] = useState(null);
  const [maskImg, setMaskImg] = useState(null);

  return (
    <AppContextCanvas.Provider
      value={{
        clicks: [clicks, setClicks],
        image: [image, setImage],
        maskCanvas: [maskImg, setMaskImg],
      }}
    >
      {props.children}
    </AppContextCanvas.Provider>
  );

};

export default AppContextCanvasProvider;
