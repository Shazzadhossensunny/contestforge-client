import Lottie from "lottie-react";
import groovyWalkAnimation from '../../public/errorani.json'
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="w-full md:w-[600px] mx-auto">
      <Lottie animationData={groovyWalkAnimation} loop={true} />
      <div className="text-center mt-10">
        <Link to="/">
        <button className="btn btn-primary text-lg">Go back Home</button>
        </Link>
      </div>
    </div>
  )
}
