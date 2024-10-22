import "swiper/css";
import 'swiper/css/navigation';
import './styles.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { PostsCashType } from "../../types/CashTypes";
import { getData } from "../../util/Util";
import PostCard from "../posts/PostCard";
import { A11y, Autoplay, Navigation } from "swiper/modules";

export default () => {
  const data = getData(8);

  return (
    <>
    <Swiper spaceBetween={25} slidesPerView={3.5}
    modules={[Autoplay,Navigation, A11y]}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}  
      navigation>
      {data?.map((post: PostsCashType) => (
        <SwiperSlide>
          <PostCard key={post._id} post={post} />
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  );
};
