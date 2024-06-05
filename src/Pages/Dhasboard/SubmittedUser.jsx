import { useParams } from "react-router-dom"
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";



export default function SubmittedUser() {
    const {name} = useParams();
    const axiosSecure = UseAxiosSecure();

    const { data: submissions = [], isLoading, refetch } = useQuery({
        queryKey: ['contestSubmissions', name],
        queryFn: async () => {
          const res = await axiosSecure.get(`/contest-submissions/${name}`);
          return res.data;
        },
        enabled: !!name,
      });

      const handleDeclareWinner = async (id) => {
        try {
          const res = await axiosSecure.patch(`/declare-winner/${id}`, { contestName: name });
          if (res.data.modifiedCount > 0) {
            Swal.fire('Winner declared successfully', '', 'success');
            refetch();
          } else {
            Swal.fire('Failed to declare winner', '', 'error');
          }
        } catch (error) {
          Swal.fire('Error declaring winner', '', 'error');
        }
      };




    if(isLoading) return <div>Loading...</div>
    const hasWinner = submissions.some(submission => submission.winner);
  return (
    <div>
    <h2 className="text-2xl lg:text-4xl font-semibold text-center mb-3">{name}</h2>
    <div className="overflow-x-auto mt-10">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="text-center text-lg">
            <th>#</th>
            <th>Participant Name</th>
            <th>Email</th>
            <th>Submitted Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={submission._id} className="text-center">
              <td>{index + 1}</td>
              <td>{submission.name}</td>
              <td>{submission.email}</td>
              <td>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  View Task
                </a>
              </td>
              <td>
                  <button
                    onClick={() => handleDeclareWinner(submission._id)}
                    className="btn bg-green-500 text-white"
                    disabled={hasWinner}
                  >
                    Declare Win
                  </button>
                  {submission.winner && <span className="ml-2 badge badge-success">Winner</span>}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}
