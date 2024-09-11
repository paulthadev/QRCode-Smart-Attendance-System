import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <section className="h-[100vh] w-full grid place-items-center px-6 ">
      <div>
        <h1 className="text-center text-2xl font-bold text-black">
          Welcome to TrackAS{" "}
        </h1>
        <h2 className="text-center text-lg text-black">Register or Login </h2>
        <div className="flex gap-x-4 mt-4 justify-center">
          <Link to="/registerLecturer">
            <button className=" btn btn-primary">Register</button>
          </Link>

          <Link to="/loginLecturer">
            <button className="btn  btn-secondary ">Login</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
