import React from "react";
import { useRouter } from "next/router";
import { Layout } from "../../layouts";
import { BiSolidUser } from "react-icons/bi";
import { BsFillCalendarDateFill, BsCloudDownload } from "react-icons/bs";
import { GoNumber } from "react-icons/go";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import GridView from "../../components/templates/postContent/gridView";

const BookDetail = () => {
  const [isShowLoad, setIsShowLoad] = React.useState(false);
  const [item, setItem] = React.useState({} as any);
  const [isBookmark, setIsBookmark] = React.useState(false);
  const [itemRekomendasi, setItemRekomendasi] = React.useState([]);

  const router = useRouter();
  // const { slug } = router.query;
  const slug = router ? router.query.slug : getSlugFromCurrentUrl();
  const fetchData = async () => {
    return await fetch(
      "https://www.googleapis.com/books/v1/volumes/" +
        slug +
        "?key=" +
        process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_KEY
    ).then((res) => res.json());
  };
  const { isLoading, error, data } = useQuery(["book", slug], fetchData, {
    enabled: !!slug,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const fetchRekomendasi = async () => {
    return await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=intitle:" +
        item?.volumeInfo?.title +
        "&key=" +
        process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_KEY
    ).then((res) => res.json());
  };

  const { isLoading: isLoadingRekomendasi, data: dataRekomendasi } = useQuery(
    ["rekomendasi", item?.volumeInfo?.title],
    fetchRekomendasi,
    {
      enabled: !!item?.volumeInfo?.title,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  const addAndRemoveBookmark = () => {
    const bookmark = localStorage.getItem("bookmark");
    if (bookmark) {
      const bookmarkParse = JSON.parse(bookmark);
      const filterBookmark = bookmarkParse.filter(
        (x: any) => x.id === item?.id
      );
      if (filterBookmark.length > 0) {
        const newBookmark = bookmarkParse.filter((x: any) => x.id !== item?.id);
        localStorage.setItem("bookmark", JSON.stringify(newBookmark));
        setIsBookmark(false);
        alert("Berhasil menghapus dari pustaka");
      } else {
        const newBookmark = [...bookmarkParse, item];
        localStorage.setItem("bookmark", JSON.stringify(newBookmark));
        setIsBookmark(true);
        alert("Berhasil menambahkan ke pustaka");
      }
    } else {
      localStorage.setItem("bookmark", JSON.stringify([item]));
      setIsBookmark(true);
      alert("Berhasil menambahkan ke pustaka");
    }
  };

  const checkBookmark = () => {
    const bookmark = localStorage.getItem("bookmark");
    if (bookmark) {
      const bookmarkParse = JSON.parse(bookmark);
      const filterBookmark = bookmarkParse.filter(
        (x: any) => x.id === item?.id
      );
      if (filterBookmark.length > 0) {
        setIsBookmark(true);
      } else {
        setIsBookmark(false);
      }
    } else {
      setIsBookmark(false);
    }
  };

  React.useEffect(() => {
    if (isLoading && isLoadingRekomendasi) {
      setIsShowLoad(true);
    } else {
      setIsShowLoad(false);
      setItem(data);
      setItemRekomendasi(dataRekomendasi?.items);
    }

    if (data) {
      checkBookmark();
    }
  }, [isLoading, data, isLoadingRekomendasi, dataRekomendasi]);

  if (error) {
    alert("Error loading data");
  }

  const handleDownload = (url: string) => {
    // open url in new tab
    window.open(url, "_blank");
  };

  return (
    <Layout.Default isLoading={isShowLoad}>
      <div className="grid grid-cols-12 gap-3" data-testid="bookDetail">
        <div className="col-span-3 border-2 shadow-lg p-1 rounded-lg">
          <img
            src={item?.volumeInfo?.imageLinks?.thumbnail || "/noimage.jpg"}
            alt={item?.volumeInfo?.title}
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="col-span-8">
          <h1 className="font-bold text-lg">
            {item?.volumeInfo?.title || "Loading..."}
          </h1>
          <div className="border-t border-dashed py-3 mt-2">
            <div className="grid grid-cols-12 items-start ">
              <span className="col-span-3 flex items-center gap-1 text-sm text-gray-500  font-semibold">
                <BiSolidUser size={14} className="text-gray-500 w-5" /> Author :
              </span>
              <div className="text-sm text-gray-500 col-span-9 font-semibold">
                {item?.volumeInfo?.authors?.map(
                  (author: any, index: number) => (
                    <span key={index}>
                      {author}
                      {index !== item?.volumeInfo?.authors?.length - 1 && (
                        <span>, </span>
                      )}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="grid grid-cols-12 mt-2 items-center ">
              <span className="col-span-4 flex items-center gap-1 text-sm text-gray-500 font-semibold">
                <BsFillCalendarDateFill
                  size={14}
                  className="text-gray-500 w-5"
                />
                Published :
              </span>
              <div className="text-sm text-gray-500 col-span-8 font-semibold">
                {item?.volumeInfo?.publishedDate}
              </div>
            </div>
            <div className="grid grid-cols-12 mt-2 items-center ">
              <span className="col-span-3 flex items-center gap-1 text-sm text-gray-500 font-semibold">
                <GoNumber size={14} className="text-gray-500 w-5" /> Pages :
              </span>
              <div className="text-sm text-gray-500 col-span-9 font-semibold">
                {item?.volumeInfo?.pageCount}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 border-t-2 gap-5 border-b-2 py-3 pt-0 flex justify-between border-dashed">
        <button
          className={
            isBookmark ? "bttn_action_detail_active" : "bttn_action_detail"
          }
          onClick={() => addAndRemoveBookmark()}
        >
          {isBookmark ? (
            <AiFillHeart size={20} />
          ) : (
            <AiOutlineHeart size={20} />
          )}
          Tambahkan ke pustaka
        </button>
        <button
          className="bttn_action_detail"
          id="btnDownloadBook"
          onClick={() => handleDownload(item?.accessInfo?.pdf?.acsTokenLink)}
          disabled={!item?.accessInfo?.pdf?.acsTokenLink}
        >
          <BsCloudDownload size={20} />
          Download
        </button>
      </div>
      <p
        className="mt-4 text-sm font-bold text-gray-500 hover:text-gray-900 transition-all duration-300"
        dangerouslySetInnerHTML={{ __html: item?.volumeInfo?.description }}
      ></p>
      <hr className="border-dashed mt-3 border-2" />
      <div className="mt-4">
        <h1 className="text-lg font-bold text-gray-600">
          Rekomendasi buku berdasarkan judul :{" "}
        </h1>
        <GridView items={itemRekomendasi} />
      </div>
    </Layout.Default>
  );
};

export default BookDetail;

const getSlugFromCurrentUrl = () => {
  const url = window.location.href;
  const slug = url.split("/detail/")[1];
  return slug;
};