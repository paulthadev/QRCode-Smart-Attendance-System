import toast from "react-hot-toast";
import { supabase } from "../utils/supabaseClient";
import useUserDetails from "../hooks/useUserDetails";
import { useEffect, useState } from "react";
import AttendanceListModal from "../component/AttendanceListModal";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const PreviousClass = () => {
  const { userDetails } = useUserDetails();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const lecturerId = userDetails?.lecturer_id;

  // Function to fetch classes based on lecturer_id
  const fetchClasses = async () => {
    if (!lecturerId) return;

    setIsLoading(true);

    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .eq("lecturer_id", lecturerId);

    if (error) {
      toast.error(`Error fetching class data: ${error.message}`);
    } else {
      setClasses(data);
    }

    setIsLoading(false); // Ensure loading state is reset in both cases
  };

  // Fetch classes when component mounts or lecturerId changes
  useEffect(() => {
    fetchClasses();
  }, [lecturerId]);

  // Function to handle opening the attendance modal
  const handleViewAttendance = (classItem) => {
    setSelectedClass(classItem);
    setIsModalOpen(true); // Open the modal
  };

  // Close modals
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null); // Clear selected class
  };

  return (
    <section className="pb-20 pt-8 px-6 max-w-7xl mx-auto">
      <div className="flex">
        <Link to="/classDetails">
          <button className="btn btn-sm rounded-full bg-blue-500 border-none text-white">
            <span className="hidden xs:block">
              <BiArrowBack />
            </span>
            Back
          </button>
        </Link>

        <h2 className="text-center mx-auto font-bold text-2xl mb-6 text-black">
          List of Previous Classes
        </h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center text-black items-center h-32">
          <div className="flex items-center justify-center">
            <div className="loading loading-spinner bg-blue-500"></div>
          </div>
        </div>
      ) : (
        <>
          {classes.length > 0 ? (
            <div className="max-h-[600px] overflow-y-auto">
              {/* List of Classes */}
              {classes.map((classItem, index) => {
                const formattedDate = new Date(
                  classItem.date
                ).toLocaleDateString();
                const formattedTime = new Date(
                  classItem.time
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={classItem.id}
                    className="grid mb-6 md:grid-cols-6 gap-4"
                  >
                    <div className="flex gap-4 md:flex-col">
                      <h2 className="font-bold text-black">S/N</h2>
                      <div className="text-neutral-700 text-sm md:text-base">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex gap-4 md:flex-col">
                      <h2 className="font-bold text-black">Course Code</h2>

                      <div className="text-neutral-700 text-sm md:text-base">
                        {classItem.course_code}
                      </div>
                    </div>
                    <div className="flex gap-4 md:flex-col">
                      <h2 className="font-bold text-black">Course Title</h2>

                      <div className="text-neutral-700 text-sm md:text-base">
                        {classItem.course_title}
                      </div>
                    </div>
                    <div className="flex gap-4 md:flex-col">
                      <h2 className="font-bold text-black">Date</h2>

                      <div className="text-neutral-700 text-sm md:text-base">
                        {formattedDate}
                      </div>
                    </div>
                    <div className="flex gap-4 md:flex-col">
                      <h2 className="font-bold text-black">Time</h2>

                      <div className="text-neutral-700 text-sm md:text-base">
                        {formattedTime}
                      </div>
                    </div>

                    <div className="flex gap-4 md:flex-col">
                      <h2 className="font-bold text-black">Attendance</h2>

                      <button
                        onClick={() => handleViewAttendance(classItem)} // Handle modal open
                        className="btn capitalize btn-sm font-bold text-white bg-green-500 border-none"
                      >
                        View List
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-black">No previous classes found.</p>
          )}
        </>
      )}

      {/* Attendance Modal */}
      <AttendanceListModal
        isOpen={isModalOpen}
        selectedClass={selectedClass}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default PreviousClass;
