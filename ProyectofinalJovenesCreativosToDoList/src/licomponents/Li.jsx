import React from "react";

export const Li = (props,param) => {
    const getislog = localStorage.getItem('islog');
    const isloguin = JSON.parse(getislog);
  return (
    <li className={props.className}><a href={props.link}>{props.content}</a></li>
  )
}
