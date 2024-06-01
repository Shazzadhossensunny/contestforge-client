import { Navigate, useLocation } from "react-router-dom"
import UseAuth from "../Hooks/UseAuth"


export default function PrivateRoute({children}) {
    const location = useLocation()
    const {user, loading} = UseAuth()
    if(loading){
        return (
            <div className=" h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )

       }

       if(user){
        return children
       }
       return <Navigate to="/login" state={location?.pathname || "/"} replace={true}></Navigate>
}
