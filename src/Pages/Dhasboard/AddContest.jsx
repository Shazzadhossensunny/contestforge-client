import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { toast } from "react-toastify";
export default function AddContest() {
  const [startDate, setStartDate] = useState(new Date());
  const axiosSecure = UseAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const info = {
      ...data,
      contestDeadline: startDate,
    };
    axiosSecure.post("/addContest", info)
    .then(res => {
      console.log(res.data)
      if(res.data.insertedId){
        toast.success('Successfully Add Contest')
        reset()
      }
    })
  };

  return (
    <div className="w-full lg:w-1/2 mx-auto">
      <h2 className="text-4xl font-medium text-center mb-5">Add Contest</h2>.
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <p className="font-bold mb-3">Contest Name</p>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div>
            <p className="font-bold mb-3">Image</p>
            <input
              {...register("image", { required: true })}
              type="text"
              placeholder="Image url"
              className="input input-bordered w-full"
            />
            {errors.image && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div>
            <p className="font-bold mb-3">Contest Price</p>
            <input
              {...register("contestPrice", { required: true })}
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            {errors.contestPrice && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div>
            <p className="font-bold mb-3">Prize Money</p>
            <input
              {...register("prizeMoney", { required: true })}
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            {errors.prizeMoney && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div>
            <p className="font-bold mb-3">Contest Deadline</p>
            <DatePicker
              className="input input-bordered w-full"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div>
            <p className="font-bold mb-3">Contest Type</p>
            <select
              {...register("contestType", { required: true })}
              defaultValue=""
              className="select select-bordered w-full"
            >
              <option disabled value="">
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
            {errors.contestType && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div>
            <p className="font-bold mb-3">Contest Description</p>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Type Here"
            ></textarea>
            {errors.description && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div>
            <p className="font-bold mb-3">Task Submission</p>
            <textarea
              {...register("task", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Type Here"
            ></textarea>
            {errors.task && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>
        <button className="btn btn-block mt-4 text-white bg-[#00c1f1] text-lg">
          Submit
        </button>
      </form>
    </div>
  );
}
