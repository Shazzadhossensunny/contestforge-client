
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import Loading from './Loading';

export default function JoinOurContest() {
    const axiosSecure = UseAxiosSecure();
    const { data: stats, isLoading } = useQuery({
        queryKey: ['contestStats'],
        queryFn: async () => {
          const res = await axiosSecure.get('/contest-stats');
          return res.data;
        }
      });
      if (isLoading) return <Loading></Loading>;
      const { latestWinner, participationCount, totalWinnerCount } = stats;
  return (
    <section className="advertise-section bg-gray-100 py-12 lg:py-24 mt-12 lg:mt-24">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl lg:text-5xl font-semibold mb-8">Join Our Contests and Win Big!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contest Winner Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Latest Contest Winner</h3>
          {latestWinner ? (
            <div>
              <img src={latestWinner.photo || 'default-image-url'} alt="Winner" className="w-32 h-32 mx-auto rounded-full mb-4" />
              <p className="text-lg font-semibold">{latestWinner.name}</p>
              <p className="text-gray-500">{latestWinner.email}</p>
              <p className="text-green-500 mt-2">Winner of {latestWinner.contestName}</p>
            </div>
          ) : (
            <p>No winners yet.</p>
          )}
        </div>

        {/* Participation Count Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Total Participation Count</h3>
          <p className="text-4xl font-semibold">{participationCount}</p>
          <p className="text-gray-500">Participants have joined our contests.</p>
        </div>

        {/* Total Winners Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Total Winners Count</h3>
          <p className="text-4xl font-semibold">{totalWinnerCount}</p>
          <p className="text-gray-500">Total winners so far.</p>
        </div>
      </div>
    </div>
  </section>
  )
}
