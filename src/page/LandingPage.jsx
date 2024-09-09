import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to our Registration Page</h1>
      <Link to="/registerLecturer">
        <button className="btn btn-primary">Register as Lecturer</button>
      </Link>
      <br />

      <Link to="/loginLecturer">
        <button className="btn btn-secondary">Login as Lecturer</button>
      </Link>
    </div>
  );
};

export default LandingPage;
