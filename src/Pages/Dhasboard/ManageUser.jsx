import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ManageUser() {
    const [selectedRole, setSelectedRole] = useState('');
  const axiosSecure = UseAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleChange = async(e, id) => {
    const newRole = e.target.value;
    setSelectedRole(newRole)
    const res = await axiosSecure.patch(`/user/${id}`, {role: newRole})
    if(res.data.modifiedCount){
        toast.success("Role Update")
    }
  }


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch()
          }
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-center text-2xl lg:text-4xl font-semibold">
        Manage user
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-center text-lg">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="text-center text-base">
                <th>{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                  <select onChange={(e)=>handleRoleChange(e,user._id)} value={selectedRole} className="select select-bordered">

                    <option value="" disabled >Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Creator">Creator</option>
                    <option value="User">User</option>
                  </select>
                </td>
                <td>
                  <select className="select select-bordered">
                    <option>Block</option>
                    <option>Unblock</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-md btn-error"
                  >
                    <MdDelete className="text-xl text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
