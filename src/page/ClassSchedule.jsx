import { useState } from "react";
import Input from "../component/Input";
import useUserDetails from "../hooks/useUserDetails";
import MapModal from "../component/MapModal";
import QRCodeModal from "../component/QRCodeModal"; // Import QRCodeModal

const ClassSchedule = () => {
  const { userDetails } = useUserDetails();

  const [selectedLocationCordinate, setSelectedLocationCordinate] =
    useState("");
  const [selectedLocationName, setSelectedLocationName] = useState("");

  const [formData, setFormData] = useState({
    courseTitle: "",
    courseCode: "",
    lectureVenue: "",
    time: "",
    date: "",
    note: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false); // New state for QR modal
  const [qrCodeData, setQRCodeData] = useState(""); // State for QR code data

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openQRCodeModal = () => setIsQRCodeModalOpen(true);
  const closeQRCodeModal = () => setIsQRCodeModalOpen(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (locationName) => {
    setFormData({
      ...formData,
      lectureVenue: locationName,
    });
    setSelectedLocationName(locationName);
    // closeModal(); // Close the modal after selecting a location
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine all form data and selected location into one string for the QR code
    const dataToEncode = JSON.stringify({
      ...formData,
      selectedLocationCordinate,
    });

    setQRCodeData(dataToEncode); // Set the data for the QR code
    openQRCodeModal(); // Open the QR code modal
  };

  return (
    <section>
      <div className="grid md:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          className="px-6 lg:px-[133px] overflow-scroll h-[100vh]"
        >
          <img src="/trackAS.png" alt="logo" className="my-24" />
          <h2 className="text-[#000D46] font-bold text-2xl mt-5 mb-7">
            Welcome{userDetails ? `, ${userDetails.fullName}` : "!"}
          </h2>
          <div className="grid gap-y-4">
            <Input
              label="Course Title"
              name="courseTitle"
              type="text"
              placeholder="Enter Course title"
              onChange={handleInputChange}
              value={formData.courseTitle}
            />

            <Input
              label="Course Code"
              name="courseCode"
              type="text"
              placeholder="Enter your course code"
              onChange={handleInputChange}
              value={formData.courseCode}
            />

            <Input
              label="Lecture Venue"
              name="lectureVenue"
              type="text"
              value={formData.lectureVenue}
              readOnly
              MapModal={openModal}
            />

            {isModalOpen && (
              <MapModal
                selectedLocationCordinate={selectedLocationCordinate}
                setSelectedLocationCordinate={setSelectedLocationCordinate}
                selectedLocationName={selectedLocationName}
                setSelectedLocationName={setSelectedLocationName}
                onChange={handleLocationChange}
                onClose={closeModal}
              />
            )}

            <div className="grid grid-cols-2 justify-stretch gap-x-10">
              <Input
                name="time"
                type="time"
                label="Time"
                placeholder="12:00AM"
                onChange={handleInputChange}
                value={formData.time}
              />
              <Input
                name="date"
                type="date"
                label="Date"
                onChange={handleInputChange}
                value={formData.date}
              />
            </div>

            <Input
              name="note"
              type="text"
              label="Note"
              placeholder="Write a note..."
              onChange={handleInputChange}
              value={formData.note}
            />
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

      {/* QRCode Modal */}
      {isQRCodeModalOpen && (
        <QRCodeModal data={qrCodeData} onClose={closeQRCodeModal} />
      )}
    </section>
  );
};

export default ClassSchedule;
