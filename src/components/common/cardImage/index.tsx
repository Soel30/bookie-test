import Link from "next/link";
import React from "react";

interface CardImageProps {
  src: string;
  children?: React.ReactNode;
  className?: string;
  url?: string;
}

export default function CardImage({
  src,
  children,
  className,
  url = "/",
}: CardImageProps) {
  return (
    <div className="card col-span-12" data-testid="card-image">
      <div className="card-body">
        <Link href={url} className="card-image relative">
          <div className="absolute w-full h-full bg-gray-900 bg-opacity-0 hover:bg-opacity-60 transition-all duration-300 rounded-tl-lg rounded-bl-lg"></div>
          <img src={src || "/noimage.jpg"} />
        </Link>
        <div className="card-content">{children}</div>
      </div>
    </div>
  );
}
