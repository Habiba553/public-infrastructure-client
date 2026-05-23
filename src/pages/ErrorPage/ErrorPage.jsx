import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">

      <h1 className="text-7xl font-bold">
        404
      </h1>

      <p className="text-2xl mt-5">
        Page Not Found
      </p>

      <Link
        to='/'
        className="btn btn-primary mt-10"
      >
        Back To Home
      </Link>

    </div>
  );
};

export default ErrorPage;