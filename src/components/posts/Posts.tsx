"use client";
import React from "react";
import { PostsCashType } from "../../types/CashTypes";
import { getData } from "../../util/Util";
import PostCard from "./PostCard";

const Posts: React.FC = () => {
  const data = getData(6);

  return (
    <>
      <div className="mx-auto pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5">
          {data?.map((post: PostsCashType) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
