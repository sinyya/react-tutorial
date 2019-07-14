import React from 'react';
import img404 from "../../assets/img/page404.jpg";
import './index.css'

/**
 * 404
 */
const Error404 = () => {
    return (
        <div className="content_wrap">
            <img src={img404} alt="404 page"/>
        </div>
    )
}

export default Error404;
