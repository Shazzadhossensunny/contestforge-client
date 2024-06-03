import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function ManageUser() {
    const [selectedRole, setSelectedRole] = useState({});
    const [status, setStatus] = useState({});

    // users data
  const axiosSecure = UseAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

   // Set initial roles and statuses when users data changes
   useEffect(() => {
    if (users.length > 0) {
      const initialRoles = {};
      const initialStatuses = {};
      users.forEach((user) => {
        initialRoles[user._id] = user.role;
        initialStatuses[user._id] = user.status;
      });
      setSelectedRole(initialRoles);
      setStatus(initialStatuses);
    }
  }, [users]);
// role change
  const handleRoleChange = async(e, id) => {
    const newRole = e.target.value;
    const res = await axiosSecure.patch(`/user/${id}`, {role: newRole})
    console.log(res.data)
    if(res.data.modifiedCount > 0){
        toast.success("Role Update")
        setSelectedRole((prevStatus) => ({
          ...prevStatus,
          [id]: newRole,
        }));

    }
    else{
      toast.error("Already Selected")
    }

  }

  // status change
  // const handleStatusChange = async(e, id) => {
  //   const newStatus = e.target.value;
  //   setStatus((prevStatus) => ({
  //     ...prevStatus,
  //     [id]: newStatus,
  //   }));
  //   const res = await axiosSecure.patch(`/user/status/${id}`, {status: newStatus})
  //   console.log(res.data)
  // }
  const handleBlock = async(id, newStatus) => {
    const res = await axiosSecure.patch(`/user/status/${id}`, {status: newStatus})
    console.log(res.data)
    if(res.data.modifiedCount > 0){
      toast.success("Status Update")
      setStatus((prevStatus) => ({
        ...prevStatus,
        [id]: newStatus,
      }));
    }
    else{
      toast.error("Already Exist")
    }




  }

  const handleUnBlock = async(id, newStatus) => {
    const res = await axiosSecure.patch(`/user/status/${id}`, {status: newStatus})
    console.log(res.data)
    if(res.data.modifiedCount > 0){
      toast.success("Status Update")
      setStatus((prevStatus) => ({
        ...prevStatus,
        [id]: newStatus,
      }));
    }
    else{
      toast.error("Already Exist")
    }

  }

// user delete
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
      <div className="overflow-x-auto mt-10">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-center text-lg">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Update Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="text-center text-base">
                <th>{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{selectedRole[user._id]}</td>
                <td>
                  <select onChange={(e)=>handleRoleChange(e,user._id)} value={selectedRole[user?._id] || ''} className="select select-bordered">

                    <option value="" disabled >Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Creator">Creator</option>
                    <option value="User">User</option>
                  </select>
                </td>
                <td className="space-x-1 space-y-1">
                  {/* <select onChange={(e)=>handleStatusChange(e,user._id)}  value={status[user._id] || ''} className="select select-bordered">
                  <option value="" disabled >Select Status</option>
                    <option>Block</option>
                    <option>Unblock</option>
                  </select> */}
                  <button
                  onClick={()=>handleBlock(user._id, "Block")}
                  disabled={status[user._id] === 'Block'}
                  className={`btn ${status[user._id] === 'Block' ? 'btn-disabled' : 'btn-primary'}`}>
                    Block
                    </button>
                  <button
                  onClick={()=>handleUnBlock(user._id, "Unblock")}
                  disabled={status[user._id] === 'Unblock'}
                  className={`btn ${status[user._id] === 'Unblock' ? 'btn-disabled' : 'btn-primary'}`}>
                    Unblock
                    </button>
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
