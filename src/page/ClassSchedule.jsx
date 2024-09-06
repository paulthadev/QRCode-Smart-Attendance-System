import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient"; // Adjust the path as necessary
import Input from "../component/Input";

const ClassSchedule = () => {
  const [lecturer, setLecturer] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchLecturerDetails = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (session && session.user) {
          const userId = session.user.id;

          const { data: lecturerData, error } = await supabase
            .from("lecturers")
            .select("id, fullName, phone_number, email, lecturer_id")
            .eq("id", userId)
            .single();

          if (error) throw error;

          if (lecturerData) {
            setLecturer(lecturerData);
          } else {
            setErrorMessage("Lecturer details not found.");
          }
        } else {
          setErrorMessage("User is not logged in.");
        }
      } catch (error) {
        console.error("Error fetching lecturer details:", error);
        setErrorMessage(`Failed to fetch lecturer details: ${error.message}`);
      }
    };

    fetchLecturerDetails();
  }, []);

  return (
    <section>
      <div className="grid md:grid-cols-2">
        <form
          action=""
          className="px-6 lg:px-[133px] overflow-scroll h-[100vh]"
        >
          <img src="/trackAS.png" alt="logo" className="my-24" />
          <h2 className="text-[#000D46] font-bold text-2xl mt-5 mb-7">
            Welcome{lecturer ? `, ${lecturer.fullName}` : "!"}
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
              <Input type="number" label="Time" placeholder="12:00AM" />
              <Input type="date" label="Date" />
            </div>
            <Input type="text" label="Note" placeholder="Write a note..." />
          </div>
          <button
            className="btn bg-[#000D46] text-white btn-block mt-6 text-base font-bold mb-8"
            type="submit"
          >
            Generate QR code
          </button>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
