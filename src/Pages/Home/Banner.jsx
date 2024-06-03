
import UseAxiosCommon from "../../Hooks/UseAxiosCommon";
import bannerImg from "../../assets/banner.jpg";
import { useState } from "react";
import SearchContestCard from "../../components/SearchContestCard";


export default function Banner() {
  const [searchTerm, setSearchTerm] = useState('');

  const [results, setResults] = useState([]);
  const axiosCommon = UseAxiosCommon()
  // const { data: contests = [], refetch } = useQuery({
  //   queryKey: ['contest', searchTerm],
  //   queryFn: async () => {
  //     const res = await axiosCommon.get(`/search?q=${searchTerm}`);
  //     return res.data;
  //   },
  //   enabled: !!searchTerm,
  // });

  // const handleSearch = () => {
  //   refetch();
  // };

  const handleSearch = async()=>{
    const res = await axiosCommon.get(`/search?q=${searchTerm}`)
    setResults(res.data)
  }


  console.log(results)
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
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search...."
              className="input input-bordered join-item"
            />
            <button onClick={handleSearch} className="btn bg-[#00c1f1] join-item text-white">
              Search
            </button>
          </div>
        </div>
      </div>
      {
        results.length > 0 && <div className="container mx-auto my-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          results.map((result)=> <SearchContestCard key={result._id} result={result}></SearchContestCard>)
        }

        </div>

      </div>
      }

    </div>
  );
}
