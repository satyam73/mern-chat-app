import React from "react";

function Message(props) {
  return (
    <div ref={props.messageRef} className={"message " + props.className}>
      {props.message}
    </div>
  );
}

export default Message;
