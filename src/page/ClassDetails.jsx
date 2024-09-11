import { Link } from "react-router-dom";

const ClassDetails = () => {
  return (
    <div className="min-h-[100vh] grid place-items-center">
      <div className="flex gap-x-4">
        <Link className="btn capitalize text-lg bg-transparent" to={'/PreviousClass'}>previous class</Link>
        <Link className="btn capitalize text-lg bg-[#000D46]" to={'/classSchedule'}>
          create class
        </Link>
      </div>
    </div>
  );
}
export default ClassDetails