import { useQuery } from "@tanstack/react-query"
import UseAuth from "./UseAuth"
import UseAxiosSecure from "./UseAxiosSecure"


export default function useRole() {
    const {user, loading} = UseAuth()
    const axiosSecure = UseAxiosSecure()

    const {data: role="", isLoading} = useQuery({
        queryKey: ['role'],
        enabled: !loading && !!user?.email,
        queryFn: async ()=> {
            const {data} = await axiosSecure(`/user/${user?.email}`)
            return data.role
        }

    })

     return [role, isLoading]
}
