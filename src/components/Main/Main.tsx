"use client";
import React from "react";
import { PostsCashType } from "../../types/CashTypes";
import { getData } from "../../util/Util";
import MainItem from "./MainItem";

const Main: React.FC = () => {
  const data = getData(2);

  return (
    <>
      <div className="grid grid-cols-12 md:gap-9">
        {data?.map((item: PostsCashType) => (
          <MainItem post={item} key={item._id} />
        ))}
      </div>
    </>
  );
};

export default Main;
