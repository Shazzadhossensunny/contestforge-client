import { useQuery } from "@tanstack/react-query"
import UseAxiosSecure from "../../Hooks/UseAxiosSecure"
import UseAuth from "../../Hooks/UseAuth"
import Winning from "../../components/Winning"
import Loading from "../../components/Loading"


export default function WinningContest() {
  const axiosSecure = UseAxiosSecure()
  const {user, loading} = UseAuth()

    const {data: winnings= [], isLoading} = useQuery({
        queryKey: ['winnings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user?.email}`)
            return res.data;
        },
        enabled: !!user?.email
    })
    const finalWinnings = winnings.filter((winning) => winning?.winner === true )
    if(loading || isLoading) return <Loading></Loading>
  return (
    <div>
        <h2 className="text-center text-2xl lg:text-4xl font-semibold">My Winning Contest</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {
              finalWinnings.map((finalWin) => <Winning key={finalWin?._id} finalWin={finalWin}></Winning>)
            }
        </div>

    </div>
  )
}
