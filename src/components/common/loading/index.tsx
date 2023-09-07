import React from "react";

interface LoadingProps {
  show?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ show = true }) => {
  return show ? (
    <div
      data-testid="loading"
      className="fixed max-w-xl  mx-auto min-h-screen w-full shadow-lg  bg-white flex justify-center items-center z-20"
    >
      Loading...
    </div>
  ) : null;
};

export default Loading;
