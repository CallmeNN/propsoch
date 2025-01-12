import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import "./embla.css";

type PropType = {
  slides: any[];
  options?: EmblaOptionsType;
  children?: React.ReactNode;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((imgsrc, index) => (
            <div className="embla__slide" key={index}>
              <div
                style={{
                  position: "absolute",
                  top: "10%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "50",
                  zIndex: "1",
                  display: "flex",
                  flexDirection: "row", // Row layout
                  alignItems: "center", // Align vertically in the center
                  justifyContent: "space-between", // Space between text and heart icon
                  width: "90%",
                }}
              >
                {props.children}
              </div>
              <img className="embla__slide__content" src={imgsrc} />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={(event) => onDotButtonClick(index,event)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
