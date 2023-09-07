import React from "react";
import { WithChildren } from "../types";
import AppBottomNav from "../components/templates/AppBottomNav";
import Head from "next/head";
import Loading from "../components/common/loading";

interface DefaultLayoutProps extends WithChildren {
  isLoading?: boolean;
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  isLoading = false,
}) => {
  const [currentDay, setCurrentDay] = React.useState<string>("pagi");

  React.useEffect(() => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 0 && hour < 12) {
      setCurrentDay("pagi");
    } else if (hour >= 12 && hour < 15) {
      setCurrentDay("siang");
    } else if (hour >= 15 && hour < 18) {
      setCurrentDay("sore");
    } else {
      setCurrentDay("malam");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Boogie</title>
      </Head>
      <div className="bg-gray-50 max-w-xl w-full mx-auto min-h-screen h-full shadow-lg ">
        <Loading show={isLoading} />
        <div className="px-4 pt-8 flex justify-between items-center border-b-2 border-dashed pb-5">
          <div>
            <h1 className="font-bold text-2xl capitalize">
              Selamat {currentDay}
            </h1>
          </div>
        </div>
        <div className="p-4 pb-40">{children}</div>
        <AppBottomNav />
      </div>
    </>
  );
};

export default DefaultLayout;
