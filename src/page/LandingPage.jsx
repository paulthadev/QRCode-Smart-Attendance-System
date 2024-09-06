import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to our Registration Page</h1>
      <button className="btn btn-primary">
        <Link to="/registerLecturer">Register as Lecturer</Link>
      </button>
      <br />

      <button className="btn btn-secondary">
        <Link to="/loginLecturer">Login as Lecturer</Link>
      </button>
    </div>
  );
};

export default LandingPage;
