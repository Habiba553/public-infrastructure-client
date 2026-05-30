import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link,useNavigate } from "react-router-dom";
const ReportIssue = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      category: "Road",
      priority: "Medium", 
    }
  });

  const selectedImage = watch("image");
  useEffect(() => {
    if (selectedImage && selectedImage.length > 0) {
      const file = selectedImage[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Clean up memory when component unmounts or image changes
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setImagePreview(null);
    }
  }, [selectedImage]);
const [userInfo, setUserInfo] = useState({});
const [issueCount, setIssueCount] = useState(0);
const limitReached =
  !userInfo.premium &&
  issueCount >= 3;
useEffect(() => {

  if (!user?.email) return;

  axios.get(
    `http://localhost:5000/users/${user.email}`,
    {
      headers: {
        authorization:
          `Bearer ${
            localStorage.getItem(
              "access-token"
            )
          }`
      }
    }
  )
  .then(res => {

    setUserInfo(res.data);

  });

  axios.get(
    `http://localhost:5000/my-issues/${user.email}`
  )
  .then(res => {
    setIssueCount(
      res.data.length
    );

  });

}, [user]);
  const onSubmit = async (data) => {
    if (limitReached) {

      Swal.fire({
    
        icon: "warning",
    
        title: "Limit Reached",
    
        text:
          "Free users can report only 3 issues. Become Premium to submit unlimited issues.",
    
        confirmButtonText: "Become Premium",
    
        showCancelButton: true,
    
        cancelButtonText: "Later"
    
      }).then((result) => {
    
        if (result.isConfirmed) {
          navigate("/dashboard/profile");
        }
      });
    
      return;
    }
    setUploading(true);
    try {
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "publicInfrastructure");

      // 1. Cloudinary Upload
      const imageUploadURL = `https://api.cloudinary.com/v1_1/ddfhwti4r/image/upload`;
      const imageRes = await axios.post(imageUploadURL, formData);
      const imageURL = imageRes.data.secure_url;

      // 2. Prepare Form Data with implicit default status
      const issueData = {
        ...data,
        userName: user?.displayName || "Anonymous",
        userEmail: user?.email,
        image: imageURL,
        userPhoto: user?.photoURL || "",
        status: "Pending", // Match your "My Issues" page requirements!
        createdAt: new Date().toISOString(),
      };

      // 3. Database Post
      const res = await axios.post("http://localhost:5000/issues", issueData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Issue Reported Successfully!",
          text: "Thank you for making the community better.",
          confirmButtonColor: "#4F46E5",
        });
        navigate('/dashboard/my-issues');
        reset();
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error submitting issue:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please check your network and try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-base-content md:text-5xl">
          Report a <span className="text-primary">Community Issue</span>
        </h1>
        <p className="mt-2 text-base-content/70">
          Help us identify and resolve infrastructure problems in your area quickly.
        </p>
      </div>
      {
  limitReached && (

    <div className="alert alert-warning mb-8">

      <span>
        Free users can report
        only 3 issues.
      </span>

      <Link
        to="/dashboard/profile"
        className="btn btn-warning btn-sm"
      >
        Become Premium
      </Link>

    </div>

  )
}
      <div className="grid gap-8 md:grid-cols-3">
        {/* --- LEFT / MAIN FORM SIDE (Takes 2 cols) --- */}
        <div className="card bg-base-100 shadow-xl border border-base-200 md:col-span-2">
          <div className="card-body p-6 sm:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Issue Title */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Issue Title</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Deep pothole on Main St."
                  className="input input-bordered w-full focus:input-primary transition-all duration-200"
                  {...register("title", { required: true })}
                  required
                />
              </div>

              {/* Grid for Category & Location */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Category Dropdown */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Category</span>
                  </label>
                  <select
                    className="select select-bordered w-full focus:select-primary"
                    {...register("category")}
                  >
                    <option value="Road">🛣️ Road </option>
                    <option value="Water">💧 Water</option>
                    <option value="Garbage">🗑️ Garbage</option>
                    <option value="Electricity">⚡ Electricity</option>
                  </select>
                </div>

                {/* Location Input */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Location / Address</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Sector 4, Block C"
                    className="input input-bordered w-full focus:input-primary"
                    {...register("location", { required: true })}
                    required
                  />
                </div>
              </div>

              {/* Description Textarea */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Detailed Description</span>
                </label>
                <textarea
                  placeholder="Provide precise details about the issue so our team can act fast..."
                  className="textarea textarea-bordered w-full min-h-[120px] focus:textarea-primary"
                  {...register("description", { required: true })}
                  required
                ></textarea>
              </div>

              {/* File Custom Input Upload Area */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Upload Proof / Photo</span>
                </label>
                <div className="relative border-2 border-dashed border-base-300 rounded-xl p-4 text-center hover:border-primary/50 transition-colors bg-base-50/50">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    {...register("image", { required: true })}
                    required
                  />
                  <div className="flex flex-col items-center justify-center py-2 space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium text-base-content/70">
                      <span className="text-primary underline">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-base-content/40">PNG, JPG or JPEG up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
 disabled={uploading}
  type="submit"
  className={`btn w-full text-white font-bold tracking-wide transition-all shadow-md block min-h-[3.2rem] bg-[#7c3aed] border-none rounded-2xl ${
    uploading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:bg-[#6d28d9] hover:-translate-y-0.5 active:translate-y-0"
  }`}
> 
  {uploading ? (
    <span className="flex items-center justify-center gap-2 w-full">
      <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>
      Processing & Uploading...
    </span>
  ) : (
    <span className="flex items-center justify-center gap-2.5 w-full">
      {/* Lucide/SVG Warning Icon to match your image */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-6 h-6 text-white drop-shadow-sm"
      >
        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
      </svg>
      <span className="text-lg font-semibold">
  {limitReached
    ? "Upgrade To Premium"
    : "Report Issue"}
</span>
    </span>
  )}
</button>

            </form>
          </div>
        </div>

        {/* --- RIGHT SIDEBAR / INFO CARD (Takes 1 col) --- */}
        <div className="space-y-6 md:col-span-1">
          {/* Reporter Identity Card */}
          <div className="card bg-neutral text-neutral-content shadow-xl">
            <div className="card-body p-6 items-center text-center">
              <h3 className="card-title text-lg font-bold mb-2">Reporter Profile</h3>
              <div className="avatar mb-2">
                <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user?.photoURL || "https://placehold.co/150?text=User"} alt="User Avatar" />
                </div>
              </div>
              <h2 className="font-bold text-xl">{user?.displayName || "Anonymous Citizen"}</h2>
              <p className="text-sm opacity-70 break-all">{user?.email || "No email linked"}</p>
              <div className="badge badge-accent mt-2 font-medium">Verified Account</div>
            </div>
          </div>

          {/* Dynamic Image Live Preview Card */}
          <div className="card bg-base-100 border border-base-200 shadow-xl overflow-hidden">
            <div className="bg-base-200 px-6 py-3 border-b border-base-300">
              <h3 className="font-bold text-sm uppercase tracking-wider text-base-content/70">Attached Image Preview</h3>
            </div>
            <div className="p-4 flex items-center justify-center bg-base-50 min-h-[200px]">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Selected Attachment Preview"
                  className="rounded-lg max-h-52 w-full object-cover shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                />
              ) : (
                <div className="text-center p-4 text-base-content/40">
                  <p className="text-xs italic">No image selected yet.</p>
                  <p className="text-[11px] mt-1">Your photo will render here instantly upon attachment selection.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReportIssue;