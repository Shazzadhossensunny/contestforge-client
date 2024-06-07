import { Link } from "react-router-dom"
import UseAuth from "../Hooks/UseAuth"
import Loading from "./Loading"


export default function SearchContestCard({result}) {
  const {loading} = UseAuth()
    const {image, name, description, participationCount, _id} = result
    if(loading) return <Loading></Loading>
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img className="h-[230px] w-full object-cover" src={image} alt="Shoes" />
      </figure>
      <div className="card-body space-y-2">
        <h2 className="card-title">{name}</h2>
        <h3 className="text-lg font-semibold">Participants : {participationCount || 0}</h3>
        <p>{description}</p>
        <Link to={`/contentDetail/${_id}`}>
          <button  className="btn bg-[#00c1f1] text-white btn-block hover:text-black">Details</button>
        </Link>
      </div>
    </div>
  )
}
