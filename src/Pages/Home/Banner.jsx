import bannerImg from "../../assets/banner.jpg";

export default function Banner() {
  return (
    <div>
      <div className="h-[600px] relative">
        <img className="h-full w-full object-cover" src={bannerImg} alt="" />
        <div className="overlay"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center space-y-6">
          <h1 className="text-3xl lg:text-5xl text-white font-bold">
            Find Your Next Challenge
          </h1>
          <p className="text-xl text-white">
            Search for contests by tags and join exciting challenges
          </p>
          <div className="join">
            <input
              type="text"
              placeholder="Search...."
              className="input input-bordered join-item"
            />
            <button className="btn bg-[#00c1f1] join-item text-white">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
