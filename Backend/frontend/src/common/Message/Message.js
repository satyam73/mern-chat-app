import React from "react";
import styles from './message.module.css';

function Message({ messageRef, className, message }) {
  return (
    <div ref={messageRef} className={`${styles["message"]} ${className}`}>
      {message}
    </div>
  );
}

export default Message;
