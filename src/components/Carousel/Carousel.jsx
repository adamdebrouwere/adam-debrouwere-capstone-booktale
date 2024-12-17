import React, { useRef } from 'react'
import './Carousel.scss'
import { usePosition } from "../../hooks/usePosition";
import { ArrowLeft, ArrowRight } from "../Aarow/Arrow.jsx";

function Carousel({ children }) {
    const ref = useRef();
    const { hasItemsOnLeft, hasItemsOnRight, scrollRight, scrollLeft } =
      usePosition(ref);
  
    return (
      <div className="carousel-container">
        <div className="carousel-container-inner" ref={ref}>
          {React.Children.map(children, (child, index) => (
            <div className="carousel-item" key={index}>
              {child}
            </div>
          ))}
        </div>
        <button
          className={`carousel-button left-carousel-button ${
            !hasItemsOnLeft && "hidden"
          }`}
          onClick={scrollLeft}
        >
          <ArrowLeft />
        </button>
        <button
          className={`carousel-button right-carousel-button ${
            !hasItemsOnRight && "hidden"
          }`}
          onClick={scrollRight}
        >
          <ArrowRight />
        </button>
      </div>
    );
  }
export default Carousel