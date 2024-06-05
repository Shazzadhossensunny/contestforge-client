import { Link } from "react-router-dom";


export default function SubmittedContest({contest}) {
    const {_id, name, prizeMoney} = contest;
  return (
    <div className="shadow-lg p-5 rounded-xl text-center border-t border-green-400">
        <Link to={`/dashboard/submittedUser/${encodeURIComponent(name)}`}>
         <h2 className="text-2xl font-semibold">{name}</h2>
        </Link>
        <h3 className="text-3xl font-semibold mt-3">${prizeMoney}</h3>
    </div>
  )
}
