import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import image1 from "../Images/banner1.jpg";
import image2 from "../Images/banner2.jpeg";
import image3 from "../Images/banner3.jpeg";
import image4 from "../Images/banner4.jpeg";
const images = [
  image1,image2,image3,image4
];
const zoomOutProperties = {
    duration: 3000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: true
  };

const SlideShow = () => {
    return (
        <div className="slide-container">
          <Zoom {...zoomOutProperties}>
            {images.map((each, index) => (
              <img key={index} style={{ width: "100%", height:"600px" }} src={each} />
            ))}
          </Zoom>
        </div>
      );
}
export default SlideShow