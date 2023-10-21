import React from "react";
import { useDarkMode } from "../Modals/DarkModeContext";

export const Li = (props,param) => {
  const { darkmode, toggleDarkMode } = useDarkMode();
    const getislog = localStorage.getItem('islog');
    const isloguin = JSON.parse(getislog);
  return (
    <li className={props.className}><a href={props.link} className={darkmode?'Navs_adark':"Navs_a"}>{props.content}</a></li>
  )
}
