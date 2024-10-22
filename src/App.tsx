import { MainSec, Posts, VerticalPosts } from "./components";
import PostsSwiper from "./components/PostsSwiper/PostsSwiper";

const App = () => {
  return (
    <>
      <div className="w-[94%] md:w-[92%] mx-auto mt-5">
        <MainSec />
        <div className="grid grid-cols-12 md:gap-9">
          <div className="col-span-12 md:col-span-9">
            <Posts />
          </div>
          <div className="col-span-12 md:col-span-3"></div>
        </div>

        <VerticalPosts />
      </div>
      <div className="bg-indigo-600 p-3 sm:p-4 md:p-6 lg:p-9">
        <div className="w-[94%] md:w-[92%] mx-auto mt-5'">
          <PostsSwiper />
        </div>
      </div>
    </>
  );
};

export default App;
