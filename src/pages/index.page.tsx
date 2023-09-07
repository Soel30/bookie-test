import React, { ChangeEvent, useState, useEffect } from "react";
import { Layout } from "../layouts";
import { useQuery } from "@tanstack/react-query";

import Carousel from "../components/common/carousel";
import PostContent from "../components/templates/postContent";
import useDebounce from "../hooks/useDebounce";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isShowLoad, setIsShowLoad] = useState(false);
  const [itemSearch, setItemSearch] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const searchDebounce = useDebounce(searchKeyword, 500);

  const { isLoading, error, data } = useQuery(
    ["googleBook"],
    () =>
      fetch(
        "https://www.googleapis.com/books/v1/volumes?q=aquaman&key=" +
          process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_KEY
      ).then((res) => res.json()),
    { enabled: true, staleTime: Infinity, cacheTime: Infinity }
  );

  if (error) {
    alert("Error loading data");
  }

  const onClickThumb = (index: number) => {
    console.log(index);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchKeyword(value);
  };

  const fetchData = async (search: any) => {
    return await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        search +
        "&key=" +
        process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_KEY
    ).then((res) => res.json());
  };

  const sortItemsByTitle = (items: any) => {
    return items.sort((a: any, b: any) => {
      if (a.volumeInfo.title < b.volumeInfo.title) {
        return -1;
      }
      if (a.volumeInfo.title > b.volumeInfo.title) {
        return 1;
      }
      return 0;
    });
  };

  const filterByDate = (dateStart: any, dateEnd: any, items: any) => {
    return items.filter((item: any) => {
      const date = new Date(item.volumeInfo.publishedDate);
      return date >= dateStart && date <= dateEnd;
    });
  };

  useEffect(() => {
    if (isLoading) {
      setIsShowLoad(true);
    } else {
      setIsShowLoad(false);
      setItems(data?.items);
    }

    if (searchDebounce) {
      setIsShowLoad(true);
      fetchData(searchDebounce).then((res) => {
        setItemSearch(res.items);
        setIsShowLoad(false);
      });
    } else {
      setItemSearch(items);
    }

    if (dateStart && dateEnd) {
      const itemsFilter = filterByDate(dateStart, dateEnd, items);
      setItems(itemsFilter);
      const itemsSearchFilter = filterByDate(dateStart, dateEnd, itemSearch);
      setItemSearch(itemsSearchFilter);
    }
  }, [isLoading, data, searchDebounce, dateStart, dateEnd]);

  return (
    <Layout.Default isLoading={isShowLoad}>
      <Carousel items={items} onClickThumb={onClickThumb} />
      <div className="my-5">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-semibold"
          id="search"
          type="text"
          placeholder="Search Book by Title"
          onChange={onChange}
        />
      </div>
      <div className="my-5">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Start Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-semibold"
              id="dateStart"
              type="date"
              placeholder="Start Date"
              onChange={(e) => setDateStart(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              End Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-semibold"
              id="dateEnd"
              type="date"
              placeholder="End Date"
              onChange={(e) => setDateEnd(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="my-5">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sort
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-semibold"
              id="sort"
              onChange={(e) => {
                if (e.target.value === "title") {
                  setItems(sortItemsByTitle(items));
                  setItemSearch(sortItemsByTitle(itemSearch));
                }
              }}
            >
              <option value="">-- Sort By --</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>

      <PostContent items={itemSearch.length > 0 ? itemSearch : items} />
    </Layout.Default>
  );
};

export default Home;
