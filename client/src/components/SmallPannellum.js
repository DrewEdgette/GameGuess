import React from "react";
import { Pannellum } from "pannellum-react";

function SmallPannellum({ image }) {
  return (
    <div className="small-pannellum">
      <Pannellum
        width="100%"
        height="100%"
        image={image}
        autoLoad
        showZoomCtrl={false}
        showFullscreenCtrl={false}
      ></Pannellum>
    </div>
  );
}

export default SmallPannellum;
