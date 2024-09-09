import Input from "../component/Input";
import useUserDetails from "../hooks/useUserDetails";

const ClassSchedule = () => {
  const { userDetails } = useUserDetails();

  return (
    <section>
      <div className="grid md:grid-cols-2">
        <form
          action=""
          className="px-6 lg:px-[133px] overflow-scroll h-[100vh]"
        >
          <img src="/trackAS.png" alt="logo" className="my-24" />
          <h2 className="text-[#000D46] font-bold text-2xl mt-5 mb-7">
            Welcome{userDetails ? `, ${userDetails.fullName}` : "!"}
          </h2>
          <div className="grid gap-y-4">
            <Input
              label="Course Title"
              type="text"
              placeholder="Enter Lecturer title"
            />
            <Input
              label="Course Code"
              type="text"
              placeholder="Enter your course code"
            />
            <Input
              label="Lecture Venue"
              type="text"
              placeholder="Enter the venue for lecture"
            />
            <div className="grid grid-cols-2 justify-stretch gap-x-10">
              <Input type="time" label="Time" placeholder="12:00AM" />+
              <Input type="date" label="Date" />
            </div>
            <Input type="text" label="Note" placeholder="Write a note..." />
          </div>
          <button
            className="btn bg-[#000D46] text-white btn-block mt-6 text-base font-bold"
            type="submit"
          >
            Generate QR code
          </button>
        </form>
        <div>
          <img
            src="/scheduleImg.jpg"
            alt="schedule image"
            className="h-screen hidden md:block w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ClassSchedule;
