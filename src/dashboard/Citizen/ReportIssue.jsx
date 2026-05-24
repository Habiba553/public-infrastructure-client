import { useForm } from "react-hook-form";

import Swal from "sweetalert2";

import axios from "axios";

import useAuth from "../../hooks/useAuth";

const ReportIssue = () => {

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset
  } = useForm();

  const onSubmit = async data => {

    const issueData = {
      ...data,
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL
    };

    const res = await axios.post(
      'http://localhost:5000/issues',
      issueData
    );

    if (res.data.insertedId) {

      Swal.fire({
        icon: 'success',
        title: 'Issue Reported Successfully'
      });

      reset();
    }
  };

  return (

    <div>

      <h1 className="text-4xl font-bold mb-10">
        Report Issue
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 max-w-2xl"
      >

        <input
          type="text"
          placeholder="Issue Title"
          className="input input-bordered w-full"
          {...register("title")}
        />

        <textarea
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          {...register("description")}
        ></textarea>

        <input
          type="text"
          placeholder="Image URL"
          className="input input-bordered w-full"
          {...register("image")}
        />

        <input
          type="text"
          placeholder="Location"
          className="input input-bordered w-full"
          {...register("location")}
        />

        <select
          className="select select-bordered w-full"
          {...register("category")}
        >

          <option value="Road">
            Road
          </option>

          <option value="Water">
            Water
          </option>

          <option value="Garbage">
            Garbage
          </option>

          <option value="Electricity">
            Electricity
          </option>

        </select>

        <button className="btn btn-primary">
          Submit Issue
        </button>

      </form>

    </div>
  );
};

export default ReportIssue;