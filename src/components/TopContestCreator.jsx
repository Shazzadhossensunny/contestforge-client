import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectFlip, Pagination, Navigation } from "swiper/modules";

export default function TopContestCreator() {
  const axiosSecure = UseAxiosSecure();
  const { data: creators = [], isLoading } = useQuery({
    queryKey: ["topCreators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-creators");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="my-12 lg:my-24 w-full lg:max-w-[500px] mx-auto">
      <h2 className="text-center text-2xl lg:text-4xl font-semibold mb-10">
        Top Contest Creators
      </h2>

      <Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="mySwiper"
      >
        {creators.map((creator, index) => (
          <SwiperSlide
            key={index}
            className="p-4 flex justify-center items-center"
          >
            <div className="bg-white shadow-lg rounded-lg p-6 w-full text-center mx-auto border-t border-t-green-400">
              <img
                src={creator.creatorPhoto}
                alt={creator.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">
                {creator.creatorName}
              </h3>
              <p className="text-xl font-semibold mb-2">{creator.name}</p>
              <p className="text-gray-600">{creator.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
