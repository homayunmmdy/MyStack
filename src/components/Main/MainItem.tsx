import { PostsCashType } from "../../types/CashTypes";

const MainItem = ({ post }: {post : PostsCashType}) => {
  const postLink = `/posts/${post._id}`
  return (
    <div className="col-span-12 md:col-span-6">
      <div className="group cursor-pointer">
        <div className=" overflow-hidden rounded-md transition-all hover:scale-105   ">
          <a
            className="relative block aspect-video"
            href={postLink}
            title={post.title.slice(0,60)}
          >
            <img
              src={post.imgurl}
              alt={post.title}
              title={post.title.slice(0,60)}
              width={500}
              height={270}
              className="w-full h-full bg-gray-600"
            />
          </a>
        </div>
        <div className="">
          <div>
            <h2 className="text-lg font-semibold leading-snug tracking-tight mt-4  ">
              <a
                href={postLink}
                title={post.title.slice(0,60)}
              >
                <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
                  {post.title.slice(0,60)}
                </span>
              </a>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainItem;
