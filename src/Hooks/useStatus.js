import { useQuery } from "@tanstack/react-query"
import UseAuth from "./UseAuth"
import UseAxiosSecure from "./UseAxiosSecure"


export default function useStatus() {
    const {user, loading} = UseAuth()
    const axiosSecure = UseAxiosSecure()

    const {data: status="", isLoading} = useQuery({
        queryKey: ['status'],
        enabled: !loading && !!user?.email,
        queryFn: async ()=> {
            const {data} = await axiosSecure(`/user/${user?.email}`)
            return data.status
        }

    })

     return [status, isLoading]
}