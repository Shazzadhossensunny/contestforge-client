

import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { toast } from "react-toastify";

export default function ContestUpdate() {
    const contest = useLoaderData();
    const axiosSecure = UseAxiosSecure()
    const {
        register,
        handleSubmit,
      } = useForm();

      // Convert contestDeadline to the required format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const defaultDate = formatDate(contest?.contestDeadline);

      const onSubmit = (data) => {
       axiosSecure.patch(`/createdContes/${contest._id}`, data)
       .then(res => {
        if(res.data.modifiedCount> 0){
           toast.success("contest update")
        }
       })

      };

  return (
    <div className="w-full lg:w-1/2 mx-auto">
        <h2 className="text-center text-2xl lg:text-4xl font-semibold">Update Contest</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <p className="font-bold mb-3">Contest Name</p>
            <input
              {...register("name")}
              type="text"
              defaultValue={contest?.name}
              placeholder="Type here"
              className="input input-bordered w-full"
            />

          </div>
          <div>
            <p className="font-bold mb-3">Email</p>
            <input
              {...register("email")}
              type="email"
              defaultValue={contest?.email}
              placeholder="Type here"
              className="input input-bordered w-full"
              disabled
            />

          </div>
          <div>
            <p className="font-bold mb-3">Image</p>
            <input
              {...register("image")}
              type="text"
              defaultValue={contest?.image}
              placeholder="Image url"
              className="input input-bordered w-full"
            />

          </div>
          <div>
            <p className="font-bold mb-3">Contest Price</p>
            <input
              {...register("contestPrice")}
              type="number"
              defaultValue={contest?.contestPrice}
              placeholder="Type here"
              className="input input-bordered w-full"
            />

          </div>
          <div>
            <p className="font-bold mb-3">Prize Money</p>
            <input
              {...register("prizeMoney")}
              type="number"
              defaultValue={contest?.prizeMoney}
              placeholder="Type here"
              className="input input-bordered w-full"
            />

          </div>
          <div>
            <p className="font-bold mb-3">Contest Deadline</p>
            <input type="date" {...register("contestDeadline")}  defaultValue={defaultDate} name="" id="" className="input input-bordered w-full" />
          </div>
          <div>
            <p className="font-bold mb-3">Contest Type</p>
            <select
              {...register("contestType")}
              defaultValue={contest?.contestType}
              className="select select-bordered w-full"
            >
              <option disabled>
                Select Contest Type
              </option>
              <option value="Image Design">Image Design</option>
              <option value="Article Writing">Article Writing</option>
              <option value="Marketing Strategy">Marketing Strategy</option>
              <option value="Digital Advertisement">
                Digital Advertisement
              </option>
              <option value="Gaming Review">Gaming Review</option>
              <option value="Book Review">Book Review</option>
              <option value="Business Idea">Business Idea</option>
              <option value="Movie Review">Movie Review</option>
            </select>

          </div>
          <div>
            <p className="font-bold mb-3">Status</p>
            <input
              {...register("status")}
              type="text"
              defaultValue={contest?.status}
              placeholder="Type here"
              className="input input-bordered w-full"disabled
            />

          </div>
          <div>
            <p className="font-bold mb-3">Contest Description</p>
            <textarea
              {...register("description")}
              defaultValue={contest?.description}
              className="textarea textarea-bordered w-full"
              placeholder="Type Here"
            ></textarea>

          </div>
          <div>
            <p className="font-bold mb-3">Task Submission</p>
            <textarea
              {...register("task")}
              defaultValue={contest?.task}
              className="textarea textarea-bordered w-full"
              placeholder="Type Here"
            ></textarea>

          </div>
        </div>
        <button className="btn btn-block mt-4 text-white bg-[#00c1f1] text-lg">
         Update
        </button>
      </form>
    </div>
  )
}
