import { Link } from "react-router-dom";
import LogoutButton from "../component/LogoutButton";

const ClassDetails = () => {
  return (
    <div className="flex  flex-col ">
      <div className="flex ml-auto pt-8 pr-8">
        <LogoutButton />
      </div>
      <div className="min-h-[80vh] grid place-items-center">
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
