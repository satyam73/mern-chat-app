import React from "react";

function Message(props) {
  console.log(props);
  return (
    <div className={"message " + props.className}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
      consequuntur.{" "}
    </div>
  );
}

export default Message;
