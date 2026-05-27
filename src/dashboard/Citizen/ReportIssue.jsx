import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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

  const [uploading, setUploading] = useState(false);
  const onSubmit = async data => {
    setUploading(true);
    const imageFile = data.image[0];
    const formData = new FormData();

formData.append('file', imageFile);

formData.append(
  'upload_preset',
  'publicInfrastructure'
);

const imageUploadURL =

  `https://api.cloudinary.com/v1_1/ddfhwti4r/image/upload`;
  const imageRes = await axios.post(
    imageUploadURL,
    formData
  );
  const imageURL = imageRes.data.secure_url;
    const issueData = {
      ...data,
      userName: user.displayName,
      userEmail: user.email,
      image: imageURL,
      userPhoto: user.photoURL
      
    };

    const res = await axios.post(
      'http://localhost:5000/issues',
      issueData
    );

    if (res.data.insertedId) {

      setUploading(false);
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
  type="file"
  accept="image/*"
  className="file-input file-input-bordered w-full"
  {...register('image')}
  required
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

        <button
  disabled={uploading}
  className="btn btn-primary"
>
  {
    uploading
      ? 'Uploading...'
      : 'Submit Issue'
  }

</button>
        

      </form>

    </div>
  );
};

export default ReportIssue;