import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

export default function MyProfile() {
  const { user, loading ,updateUserProfile} = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
  } = useForm()

  const { data: userData, isLoading } = useQuery({
    queryKey: ["userContests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-contests/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const onSubmit = (data) =>{
    axiosSecure.patch(`/update-profile/${user?.email}`, data)
    .then(res => {
        console.log(res.data)
        if(res.data.modifiedCount > 0){
            updateUserProfile(data.name, data.image)
            toast.success("Update Profile")
            reset()
        }

    })
}

  if (loading || isLoading) return <Loading></Loading>;

  const { contests, winPercentage } = userData || {
    contests: [],
    winPercentage: 0,
  };

  const data = [
    { name: "Wins", value: winPercentage },
    { name: "Losses", value: 100 - winPercentage },
  ];
  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div>
      <h2 className="text-center text-2xl lg:text-4xl font-semibold">My Profile</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
      <div className="w-full h-96 shadow-lg rounded-xl p-10">
        <h2 className="text-center text-xl font-medium">Win & Loss Percentage</h2>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="shadow-lg rounded-xl p-10">
      <h2 className="text-center text-xl font-medium mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
            <div>
            <p className="font-bold mb-3">User Name</p>
            <input
            {...register("name")}
              type="text"
              placeholder="user Name"
              className="input input-bordered w-full"
            />
          </div>
            <div>
            <p className="font-bold mb-3">Image URL</p>
            <input
            {...register("image")}
              type="text"
              placeholder="Image URL"
              className="input input-bordered w-full"
            />
          </div>
            <div>
            <p className="font-bold mb-3">Addition Info</p>
            <input
            {...register("additionalInfo")}
              type="text"
              placeholder="Addition Info"
              className="input input-bordered w-full"
            />
          </div>
            </div>
            <button type="submit" className="btn btn-block mt-4 text-lg bg-[#00c1f1] text-white">Update</button>

        </form>
      </div>

      </div>

    </div>
  );
}