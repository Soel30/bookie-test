import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
import Link from "next/link";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
interface IProps {
  items: any[];
  onClickThumb: (index: number) => void;
}

export default function Carousel({ items, onClickThumb }: IProps) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    accessibility: false,
  };
  return (
    <div className="border-b-2 border-dashed py-5" data-testid="carousel">
      <Slider {...settings}>
        {items?.map((item: any, index) => (
          <div key={index}>
            <Link
              href={"/detail/" + item?.id}
              className="shadow-lg rounded-lg w-full h-full relative"
            >
              <div className="relative">
                <div className="absolute top-0 right-0 p-2 bg-gray-950 w-full h-full bg-opacity-50"></div>
                <img
                  src={item?.volumeInfo.imageLinks?.thumbnail || "/noimage.jpg"}
                  className="w-full h-64 rounded-lg object-cover shadow-xl"
                  onClick={() => onClickThumb(index)}
                />
              </div>
              <div className="absolute bottom-0 w-full p-4 bg-gray-950 text-white opacity-80 font-bold text-lg">
                {item?.volumeInfo.title}
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
