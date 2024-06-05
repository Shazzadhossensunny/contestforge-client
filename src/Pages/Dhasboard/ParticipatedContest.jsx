import { useEffect, useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function ParticipatedContest() {
  const [sortedContests, setSortedContests] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const axiosSecure = UseAxiosSecure();
  const { user, loading } = UseAuth();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contestItems", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    onSuccess: (data) => {
      setSortedContests(data);
      sortContests(sortOrder, data);
    },
  });

  const sortContests = (order, data = sortedContests) => {
    const sorted = [...data].sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
    setSortOrder(order);
    setSortedContests(sorted);
  };

  useEffect(() => {
    if (contests.length) {
      sortContests(sortOrder, contests);
    }
  }, [contests]);

  if (loading || isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h2 className="text-center text-2xl lg:text-4xl font-semibold">
        My Participated Contest
      </h2>
      <div className="flex justify-end mb-4">
        <button onClick={() => sortContests("asc")} className="btn btn-outline">
          Sort Ascending
        </button>
        <button
          onClick={() => sortContests("desc")}
          className="btn btn-outline ml-2"
        >
          Sort Descending
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-center text-base">
              <th>#</th>
              <th>Transaction ID</th>
              <th>Email</th>
              <th>Contest Name</th>
              <th>Price</th>
              <th>Payment Status</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {sortedContests.map((contest, index) => (
              <tr key={contest._id} className="text-center">
                <td>{index + 1}</td>
                <td>{contest.transactionId}</td>
                <td>{contest.email}</td>
                <td>{contest.contestName}</td>
                <td>${contest.price}</td>

                <td>{contest.paymentStatus}</td>

                <td>{new Date(contest.deadline).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
