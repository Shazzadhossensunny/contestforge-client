import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";


export default function Leaderboard() {
    const axiosSecure = UseAxiosSecure();
    const { data: leaderboard = [], isLoading } = useQuery({
      queryKey: ['leaderboard'],
      queryFn: async () => {
        const res = await axiosSecure.get('/leaderboard');
        return res.data;
      }
    });

    console.log(leaderboard)

    if (isLoading) return <div>Loading...</div>;
  return (
    <div className='my-12 lg:my-24 container mx-auto'>
      <h2 className="text-center text-2xl lg:text-4xl font-semibold mb-8">
        LeaderBoard
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="">
              <th className="px-6 py-3 bg-gray-100 text-center text-xl font-medium text-gray-500 uppercase tracking-wider">
                Ranking
              </th>
              <th className="px-6 py-3 bg-gray-100 text-center text-xl font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 bg-gray-100 text-center text-xl font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-gray-100 text-center text-xl font-medium text-gray-500 uppercase tracking-wider">
                Wins
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={index} className="text-center text-lg">
                <td className="px-6 py-4 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full object-cover" src={user.photo} alt={user.name} />
                    </div>
                    <div className="ml-4">
                      <div className=" font-medium text-gray-900">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className=" text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className=" text-gray-500">{user.winCount}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
