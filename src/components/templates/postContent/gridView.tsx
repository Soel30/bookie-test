import React from "react";
import { BiSolidUser } from "react-icons/bi";
import { BsFillCalendarDateFill } from "react-icons/bs";
import Link from "next/link";

interface GridViewProps {
  items: any[];
}

const GridView: React.FC<GridViewProps> = ({ items }) => {
  return (
    <div className="mt-5 grid grid-cols-2 gap-4" data-testid="gridView">
      {items?.map((item: any, index: number) => (
        <div className="max-w-sm rounded overflow-hidden shadow-lg" key={index}>
          <Link href={"/detail/" + item?.id} className=" relative">
            <div className="absolute w-full h-full bg-gray-900 bg-opacity-0 hover:bg-opacity-60 transition-all duration-300 rounded-tl-lg rounded-bl-lg"></div>
            <img
              src={item?.volumeInfo.imageLinks?.thumbnail || "/noimage.jpg"}
              className="w-full h-52 object-cover rounded-tr-lg rounded-tl-lg"
            />
          </Link>
          <div className="px-6 py-4">
            <div className="font-bold text-l mb-2 truncate">
              <Link
                href={"/detail/" + item?.id}
                className="hover:text-pink-600 transition-all duration-300"
              >
                {item?.volumeInfo.title}
              </Link>
            </div>
            <div className="grid grid-cols-7 mt-2 items-center">
              <span className="col-span-1">
                <BiSolidUser size={14} className="text-gray-500 w-5" />
              </span>
              <div className="text-sm text-gray-500 col-span-6 font-semibold">
                {item?.volumeInfo.authors?.map((author: any, index: number) => (
                  <span key={index}>
                    {author}
                    {index !== item?.volumeInfo.authors?.length - 1 && (
                      <span>, </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-7 mt-2 items-center">
              <span className="col-span-1">
                <BsFillCalendarDateFill size={14} className="text-gray-500" />
              </span>
              <p className="text-sm text-gray-500 col-span-6 font-semibold">
                {item?.volumeInfo.publishedDate}
              </p>
            </div>
            <p
              className="mt-4 text-sm font-bold text-gray-500 descText hover:text-gray-900 transition-all duration-300"
              dangerouslySetInnerHTML={{
                __html: item?.volumeInfo?.description,
              }}
            ></p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <div className=""></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridView;
