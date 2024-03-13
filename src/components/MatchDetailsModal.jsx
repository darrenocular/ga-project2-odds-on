import React from "react";
import ReactDOM from "react-dom";

const OverLay = () => {};

const MatchDetailsModal = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay></OverLay>,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default MatchDetailsModal;
