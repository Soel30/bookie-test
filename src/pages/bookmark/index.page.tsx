import PostContent from "../../components/templates/postContent";
import { Layout } from "../../layouts";
import React from "react";

const Bookmark = () => {
  const [bookmarkData, setBookmarkData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    const bookmark = localStorage.getItem("bookmark");
    if (bookmark) {
      const bookmarkParse = JSON.parse(bookmark);
      setBookmarkData(bookmarkParse);
      setIsLoading(false);
    }
  }, []);
  return (
    <Layout.Default isLoading={isLoading}>
      <div className="mt-4" data-testid="bookmark">
        <h1 className="text-lg font-bold text-gray-600">
          Bookmark ({bookmarkData.length})
        </h1>
        <PostContent items={bookmarkData} />
      </div>
    </Layout.Default>
  );
};

export default Bookmark;
