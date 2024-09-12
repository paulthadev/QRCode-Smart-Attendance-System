import { CloseCircle } from "iconsax-react";

/* eslint-disable react/prop-types */
const AttendanceListModal = ({ isOpen, selectedClass, onClose }) => {
  if (!isOpen || !selectedClass) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <h2 className="text-xl font-bold underline  mb-4 text-black">
          Attendance List
        </h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-4 hover:text-red-500 text-black"
        >
          <CloseCircle variant="Bold" />
        </button>

        {selectedClass.attendees && selectedClass.attendees.length > 0 ? (
          selectedClass.attendees.map((attendee, index) => {
            const formattedTimestamp = new Date(
              attendee.timestamp
            ).toLocaleString([], {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div key={index} className="mb-4 border-b pb-2">
                <p className="text-black uppercase text-sm font-semibold">
                  Name: {attendee.name}
                </p>
                <p className="text-black uppercase text-sm font-semibold">
                  Matric No: {attendee.matric_no}
                </p>
                <p className="text-gray-800 text-sm">
                  Attended At: {formattedTimestamp}
                </p>
              </div>
            );
          })
        ) : (
          <p>No attendees found for this class.</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceListModal;
