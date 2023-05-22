import React from "react";

function Message(props) {
  // console.log(props);
  return (
    <div className={"message " + props.className}>
      {props.message}
    </div>
  );
}

export default Message;
