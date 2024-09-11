import { Link } from "react-router-dom";
import LogoutButton from "../component/LogoutButton";
import useUserDetails from "../hooks/useUserDetails";

const ClassDetails = () => {
  const { userDetails } = useUserDetails();
  return (
    <div className="flex flex-col ">
      <div className="flex ml-auto pt-8 pr-8">
        <LogoutButton />
      </div>
      <div className="min-h-[80vh]  grid place-items-center">
        <h2 className="lg:text-4xl text-neutral-800 md:text-2xl text-xl font-bold mt-2 text-center">
          Welcome, {userDetails?.fullName}
        </h2>
        <div className="flex gap-x-4">
          <Link
            className="btn capitalize text-black hover:text-white text-lg bg-transparent"
            to={"/PreviousClass"}
          >
            previous class
          </Link>
          <Link
            className="btn capitalize text-white text-lg bg-[#000D46]"
            to={"/classSchedule"}
          >
            create class
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ClassDetails;
