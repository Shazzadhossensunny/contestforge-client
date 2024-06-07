import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure"
import SubmittedContest from "../../components/SubmittedContest";
import Loading from "../../components/Loading";


export default function ContestSubmitted() {
  const axiosSecure = UseAxiosSecure();
  const {data: contests=[], isLoading}= useQuery({
    queryKey: ['contests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/addContest')
      return res.data;
    }
  })
  if(isLoading) return <Loading></Loading>
  return (
    <div>
      <h2 className="text-center text-2xl lg:text-4xl font-semibold">Contest Submitted</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {
          contests.map((contest) => <SubmittedContest key={contest._id} contest={contest}></SubmittedContest>)
        }

      </div>

    </div>
  )
}
