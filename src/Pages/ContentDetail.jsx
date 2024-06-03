import { Link, useLoaderData } from "react-router-dom"
import Countdown from 'react-countdown';
import useRole from "../Hooks/useRole";


export default function ContentDetail() {
  const contest = useLoaderData()
  const [role, isLoading] = useRole()
  const Completionist = () => <span>Not Available</span>
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <div>
          <span>{days}d {hours}h {minutes}m {seconds}s</span>
        </div>
      );
    }
  };
if(isLoading) return
  return (
    <div className="container mx-auto my-12 lg:my-24">
       <h2 className="text-2xl lg:text-4xl font-semibold text-center mb-3">{contest?.name}</h2>
       <div className="h-[500px]">
        <img className="w-full h-full object-cover" src={contest?.image} alt="" />
       </div>
       <h3 className="text-2xl lg:text-3xl font-semibold mt-4">Participation : 0</h3>
       <h3 className="text-xl lg:text-2xl font-semibold mt-4">Contest Price : ${contest?.prizeMoney}</h3>
       <p className="mt-4">Description: {contest?.description}</p>
       <p className="mt-4">Task: {contest?.task}</p>
       {/* winner name & image*/}
       <div className="text-4xl my-4 font-bold">
       <Countdown date={new Date(contest?.contestDeadline)} renderer={renderer}></Countdown>
       </div>
       {/* <h4>{new Date(contest.contestDeadline).toLocaleString()}</h4> */}
       {(role !== "Admin" && role !== "Creator") ? (
        <Link to={`/payment?prizeMoney=${contest?.prizeMoney}`}>
          <button className="btn bg-[#00c1f1] text-white text-lg">Registration</button>
        </Link>
      ) : (
        <button className="btn bg-[#00c1f1] text-white text-lg" disabled>
          Registration
        </button>
      )}



    </div>
  )
}
