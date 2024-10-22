"use client";
import { PostsCashType } from "../../types/CashTypes";
import React from "react";
import PostsCash from "../../cash/PostsCash";
import MainItem from "./MainItem";
import MainSkeleton from "./MainSkeleton";

const Main: React.FC = () => {
  const posts = PostsCash;
  const data = posts?.slice(0,2)

  if (!data) {
    return <MainSkeleton />;
  }


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
