import React from "react";
import loadingGif from "../images/loading.gif";

function Loader() {
  return (
    <>
      <img src={loadingGif} alt="loader" height={22} />
    </>
  );
}

export default Loader;
