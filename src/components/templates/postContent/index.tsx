import React from "react";
import ListView from "./listView";
import GridView from "./gridView";
import { CiBoxList, CiGrid41 } from "react-icons/ci";

interface PostContentProps {
  items: any[];
}

const PostContent: React.FC<PostContentProps> = ({ items }) => {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  const changeViewMode = () => {
    if (viewMode === "grid") {
      setViewMode("list");
    }
    if (viewMode === "list") {
      setViewMode("grid");
    }
  };
  return (
    <>
      <div className="flex justify-end mt-4">
        <button onClick={changeViewMode} className="mr-2">
          {viewMode === "grid" ? (
            <CiGrid41 size={24} className="text-gray-500" />
          ) : (
            <CiBoxList size={24} className="text-gray-500" />
          )}
        </button>
      </div>
      {viewMode === "list" && <ListView items={items} />}
      {viewMode === "grid" && <GridView items={items} />}
    </>
  );
};

export default PostContent;
