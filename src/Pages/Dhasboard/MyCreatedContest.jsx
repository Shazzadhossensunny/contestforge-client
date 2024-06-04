import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useStatus from "../../Hooks/useStatus";

export default function MyCreatedContest() {
  const { user, loading } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [status] = useStatus();
  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/createdContest/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/createdContest/${id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your contest has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  if (loading || isLoading) return;
  return (
    <div>
      <h2 className="text-center text-2xl lg:text-4xl font-semibold">
        My Created Contest
      </h2>
      <div className="overflow-x-auto mt-10">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-center text-lg">
              <th>#</th>
              <th>Contest Name</th>
              <th>Image</th>
              <th>Contest Price</th>
              <th>Price Money</th>
              <th>Contest Type</th>
              <th>Status</th>
              <th>Action</th>
              <th>Submission</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr key={contest?._id} className="text-center text-base">
                <th>{index + 1}</th>
                <td>{contest?.name}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={contest?.image} alt="image" />
                    </div>
                  </div>
                </td>
                <td>${contest?.contestPrice}</td>
                <td>${contest?.prizeMoney}</td>
                <td>{contest?.contestType}</td>
                <td>
                  <div
                    className={`badge ${
                      contest?.status === "pending"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {contest?.status}
                  </div>
                </td>
                <td className="space-x-2 space-y-2 ">
                  {status === "Block" || contest?.status === "confirm"? (
                    <>
                      <button disabled className="btn text-xl">
                        <FiEdit />
                      </button>

                      <button
                        disabled
                        onClick={() => handleDelete(contest?._id)}
                        className="btn btn-error text-white text-xl"
                      >
                        <MdDelete />
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to={`/dashboard/contestUpdate/${contest?._id}`}>
                        <button className="btn text-xl">
                          <FiEdit />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(contest?._id)}
                        className="btn btn-error text-white text-xl"
                      >
                        <MdDelete />
                      </button>
                    </>
                  )}
                </td>
                <td>
                  {status === "Block" ? (
                    <button disabled className="btn bg-[#00c1f1] text-white">
                      Submission
                    </button>
                  ) : (
                    <Link to="/dashboard/contestSubmitted">
                      <button className="btn bg-[#00c1f1] text-white">
                        Submission
                      </button>
                    </Link>
                  )}
                </td>
                <td className="w-[200px]">{contest?.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
