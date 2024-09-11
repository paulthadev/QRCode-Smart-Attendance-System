import toast from "react-hot-toast";
import { supabase } from "../utils/supabaseClient";
import useUserDetails from "../hooks/useUserDetails";
import { useEffect, useState } from "react";
import AttendanceListModal from "../component/AttendanceListModal";

const PreviousClass = () => {
  const { userDetails } = useUserDetails();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lecturerId = userDetails?.lecturer_id;

  // Function to fetch classes based on lecturer_id
  const classList = async () => {
    if (!lecturerId) return; // Prevent fetching without lecturer_id

    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .eq("lecturer_id", lecturerId);

    if (error) {
      toast.error(`Error fetching class data: ${error.message}`);
      return;
    }

    setClasses(data);
  };

  // Fetch classes when component mounts or lecturerId changes
  useEffect(() => {
    classList();
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
      <h2 className="text-center font-bold text-2xl mb-6 text-black capitalize">
        List of Previous Classes
      </h2>

      {classes.length > 0 ? (
        <>
          {/* Headings */}
          <div className="grid mb-6 md:grid-cols-6 gap-4 font-bold text-black">
            <div className="w-12">
              <h2>S/N</h2>
            </div>
            <div>
              <h2>Course Code</h2>
            </div>
            <div>
              <h2>Course Title</h2>
            </div>
            <div>
              <h2>Date</h2>
            </div>
            <div>
              <h2>Time</h2>
            </div>
            <div>
              <h2>Attendance</h2>
            </div>
          </div>

          {/* List of Classes */}
          {classes.map((classItem, index) => {
            const formattedDate = new Date(classItem.date).toLocaleDateString();
            const formattedTime = new Date(classItem.time).toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            );

            return (
              <div
                key={classItem.id}
                className="grid mb-6 md:grid-cols-6 gap-4"
              >
                <div className="w-12">
                  <div className="text-neutral-700 text-sm md:text-base">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <div className="text-neutral-700 text-sm md:text-base">
                    {classItem.course_code}
                  </div>
                </div>
                <div>
                  <div className="text-neutral-700 text-sm md:text-base">
                    {classItem.course_title}
                  </div>
                </div>
                <div>
                  <div className="text-neutral-700 text-sm md:text-base">
                    {formattedDate}
                  </div>
                </div>
                <div>
                  <div className="text-neutral-700 text-sm md:text-base">
                    {formattedTime}
                  </div>
                </div>
                <div>
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
        </>
      ) : (
        <p className="text-center text-black">No previous classes found.</p>
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
