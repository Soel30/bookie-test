import React from "react";
import { BiSolidUser } from "react-icons/bi";
import { BsFillCalendarDateFill } from "react-icons/bs";
import CardImage from "../../common/cardImage";
import Link from "next/link";

interface ListViewProps {
  items: any[];
}

const ListView: React.FC<ListViewProps> = ({ items }) => {
  return (
    <div className="mt-5 grid grid-cols-12 gap-4" data-testid="listView">
      {items?.map((item: any, index: number) => (
        <CardImage
          src={item?.volumeInfo.imageLinks?.thumbnail}
          key={index}
          url={"/detail/" + item?.id}
        >
          <div className="font-bold text-lg truncate">
            <Link
              href={"/detail/" + item?.id}
              className="hover:text-pink-600 transition-all duration-300"
            >
              {item?.volumeInfo.title}
            </Link>
          </div>
          <div className="grid grid-cols-12 mt-2 items-center">
            <span className="col-span-1">
              <BiSolidUser size={20} className="text-gray-500 w-5" />
            </span>
            <div className="text-sm text-gray-500 col-span-11 font-semibold">
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
          <div className="grid grid-cols-12 mt-2 items-center">
            <span className="col-span-1">
              <BsFillCalendarDateFill className="text-gray-500" />
            </span>
            <p className="text-sm text-gray-500 col-span-11 font-semibold">
              {item?.volumeInfo.publishedDate}
            </p>
          </div>
          <p
            className="mt-4 text-sm font-bold text-gray-500 descText hover:text-gray-900 transition-all duration-300"
            dangerouslySetInnerHTML={{
              __html: item?.volumeInfo?.description,
            }}
          ></p>
        </CardImage>
      ))}
    </div>
  );
};

export default ListView;
