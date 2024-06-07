import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "../../components/Loading";

export default function ManageContest() {
  const [selectedContestId, setSelectedContestId] = useState(null);
  const axiosSecure = UseAxiosSecure();
  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/addContest");
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

  const handleConfirm = (id) => {
    axiosSecure.patch(`/status/${id}`, { status: "confirm" }).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        toast.success("Update Contest Status");
        refetch();
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;

    if (selectedContestId) {
      const res = await axiosSecure.patch(`/comment/${selectedContestId}`, {
        comment,
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Comment submitted");
        setSelectedContestId(null);
        e.target.comment.value = "";
        // document.getElementById('my_modal_5').close();
        refetch(); // refetch contests after comment submission
      } else {
        toast.error("Failed to submit comment");
      }
    } else {
      toast.error("No contest selected");
    }
  };

  if (isLoading) return <Loading></Loading>
  return (
    <div>
      <h2 className="text-center text-2xl lg:text-4xl font-semibold">
        Manage Contest
      </h2>

      <div className="overflow-x-auto mt-10">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-center text-lg">
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price Money</th>
              <th>Content Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}
            {contests.map((contest, index) => (
              <tr key={contest?._id} className="text-center text-base">
                <th>{index + 1}</th>
                <td>{contest?.name}n</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={contest?.image} />
                    </div>
                  </div>
                </td>
                <td>{contest?.prizeMoney}</td>
                <td>{contest?.contestType}</td>
                <td className="space-x-0 lg:space-x-2 space-y-2 lg:space-y-0">
                  <button
                    onClick={() => handleDelete(contest?._id)}
                    className="py-2 px-3 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleConfirm(contest?._id)}
                    className="py-2 px-3 bg-green-500 text-white rounded-md"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setSelectedContestId(contest?._id);
                      document.getElementById("my_modal_5").showModal();
                    }}
                    className="py-2 px-3 bg-blue-500 text-white rounded-md"
                  >
                    Comment
                  </button>
                </td>
              </tr>
            ))}
            {/* modal */}
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-2">Comment</h3>
                <form onSubmit={handleSubmit}>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    name="comment"
                    placeholder="Write here"
                  ></textarea>
                  <button className="btn bg-[#00c1f1] text-white">
                    Submit
                  </button>
                </form>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
            {/* modal */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
