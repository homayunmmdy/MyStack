"use client";
import React from "react";
import PostsCash from "../../cash/PostsCash";
import { PostsCashType } from "../../types/CashTypes";
import { getData } from "../../util/Util";
import MainItem from "./MainItem";
import MainSkeleton from "./MainSkeleton";

const Main: React.FC = () => {
  const data = getData(PostsCash, 2, <MainSkeleton />);

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
