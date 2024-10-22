import { MainSec, Posts } from "./components";

const App = () => {
  return (
    <div className="w-[94%] md:w-[92%] mx-auto mt-5">
      <MainSec />
      <div className="grid grid-cols-12 md:gap-9">
        <div className="col-span-12 md:col-span-9">
          <Posts />
        </div>
        <div className="col-span-12 md:col-span-3"></div>
      </div>
    </div>
  );
};

export default App;
