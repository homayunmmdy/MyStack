import PostsCash from "../cash/PostsCash";

export const getData = (amount: number) => {
  const posts = PostsCash;
  const data = posts?.slice(0, amount);

  return data;
};
