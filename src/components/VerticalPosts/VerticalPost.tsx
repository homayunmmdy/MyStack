import { PostsCashType } from "../../types/CashTypes";

const VerticalPost = ({ post }: {post : PostsCashType}) => {
  return (
    <>
      <a
        key={post._id}
        href={`/posts/${post._id}`}
        className="group relative w-full flex items-end justify-start text-left bg-cover bg-center h-[450px]  rounded-md bg-slate-400"
        style={{ backgroundImage: `url(${post.imgurl})` }}
      >
        <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        <main className="p-5 z-10">
          <h4 className="text-md tracking-tight font-medium leading-7 font-regular text-white group-hover:underline group-hover:text-indigo-700">
            {post.title.slice(0,90)}
          </h4>
        </main>
      </a>
    </>
  );
};

export default VerticalPost;
