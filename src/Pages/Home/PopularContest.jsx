import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "../../Hooks/UseAxiosCommon";
import PopularContestCard from "../../components/PopularContestCard";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

export default function PopularContest() {
  const axiosCommon = UseAxiosCommon();
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["allContests"],
    queryFn: async () => {
      const res = await axiosCommon.get("/popular-contests");
      return res.data;
    },
  });

  // Filter contests by status
  const confirmedContests = contests.filter((contest) => contest.status === "confirm" || "");

  if (isLoading) return <Loading></Loading>;
  return (
    <div className="container mx-auto mt-12 lg:mt-24 px-3">
      <h2 className="text-center text-2xl lg:text-4xl font-semibold">
        Popular Contest
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {confirmedContests.map((contest) => (
          <PopularContestCard
            key={contest._id}
            contest={contest}
          ></PopularContestCard>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/allContest">
          <button className="btn bg-[#00c1f1] text-white text-lg">Show All</button>
        </Link>
      </div>
    </div>
  );
}
