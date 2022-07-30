import React from "react"
import { Link } from "react-router-dom";
import "../styles/mobilenav.css"

export default function MobileNav({ menuItems }) {
  
  return (
    <div className="overlay navigation">
        <div className="overlay-content">
          {
            menuItems.map((item, index) => {
              return (
                <Link to={item.path} href={item.path} key={index}>{item.name}</Link>
              )
            })
          }
        </div>
    </div>
  )
}