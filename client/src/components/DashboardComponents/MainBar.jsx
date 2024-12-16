import React from "react";
import TranslatorBoxes from "./TranslatorBox/TranslatorBoxes";
import Trending from "./Trending";
import FeedbackDashboard from "./FeedbackDashboard";

const MainBar = () => {
  return (
    <div className="bg-white lg:w-[85%] h-full p-[10px] overflow-y-scroll w-full">
      <Trending />
      <TranslatorBoxes />
      <FeedbackDashboard />
    </div>
  );
};

export default MainBar;
