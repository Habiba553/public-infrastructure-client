import { useContext } from "react";
import { AuthContext } from "./providers/AuthProvider";

function App() {

  const {
    createUser,
    signInWithGoogle,
    user,
    logoutUser
  } = useContext(AuthContext);

  const handleRegister = () => {

    createUser("test@test.com", "123456")
      .then(result => {
        console.log(result.user);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const handleGoogleLogin = () => {

    signInWithGoogle()
      .then(result => {
        console.log(result.user);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <div className="text-center mt-20">

      <h1 className="text-4xl font-bold mb-10">
        Firebase Auth Test
      </h1>

      <button
        onClick={handleRegister}
        className="btn btn-primary mr-5"
      >
        Test Register
      </button>

      <button
        onClick={handleGoogleLogin}
        className="btn btn-secondary"
      >
        Google Login
      </button>

      {
        user &&
        <div className="mt-10">
          <img
            src={user.photoURL}
            alt=""
            className="w-20 h-20 rounded-full mx-auto"
          />

          <h2 className="text-2xl font-bold mt-5">
            {user.displayName}
          </h2>

          <p>{user.email}</p>

          <button
            onClick={logoutUser}
            className="btn btn-error mt-5"
          >
            Logout
          </button>
        </div>
      }

    </div>
  );
}

export default App;