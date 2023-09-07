import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiSearchAlt, BiHomeAlt, BiUser, BiBookBookmark } from "react-icons/bi";
interface AppBottomNavProps {
  showNav?: boolean;
}

const AppBottomNav: React.FC<AppBottomNavProps> = ({ showNav = true }) => {
  return showNav ? (
    <div className="fixed shadow-lg bottom-0 p-5 w-full max-w-xl bg-white">
      <ul className="flex justify-between items-center">
        <li>
          <Link className="link-nav" href="/">
            <BiHomeAlt size={20} />
            <h1 className="font-semibold">Home</h1>
          </Link>
        </li>
        <li>
          <Link className="link-nav" href="/bookmark">
            <BiBookBookmark size={20} />
            <h1 className="font-semibold">Bookmark</h1>
          </Link>
        </li>
      </ul>
    </div>
  ) : null;
};

export default AppBottomNav;
