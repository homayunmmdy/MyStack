"use client";
import React from "react";
import { PostsCashType } from "../../types/CashTypes";
import { getData } from "../../util/Util";
import VerticalPost from "./VerticalPost";

const VerticalPosts: React.FC = () => {
  const data = getData(4);

  return (
    <>
      <div className="mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-5">
          {data?.map((post: PostsCashType) => (
            <VerticalPost key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default VerticalPosts;
