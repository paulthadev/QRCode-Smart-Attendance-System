import { useState } from "react";
import Input from "../component/Input";
import MapModal from "../component/MapModal";
import QRCodeModal from "../component/QRCodeModal";
import scheduleImg from "../../public/scheduleImg.jpg";
import logo from "../../public/trackAS.png";

const ClassSchedule = () => {
  const [formData, setFormData] = useState({
    courseTitle: "",
    courseCode: "",
    lectureVenue: "",
    time: "",
    date: "",
    note: "",
  });

  const [selectedLocationCordinate, setSelectedLocationCordinate] =
    useState(null);
  const [qrData, setQrData] = useState("");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (locationName, coordinate) => {
    setFormData({ ...formData, lectureVenue: locationName });
    setSelectedLocationCordinate(coordinate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const coordinateString = selectedLocationCordinate
      ? `${selectedLocationCordinate.lat.toFixed(
          6
        )},${selectedLocationCordinate.lng.toFixed(6)}`
      : "No coordinates selected";

    const simpleText = `${formData.courseTitle} - ${formData.courseCode}
Venue: ${formData.lectureVenue}
Time: ${formData.time}
Date: ${formData.date}
Note: ${formData.note}
Coordinates: ${coordinateString}`;

    setQrData(simpleText);
    setIsQRModalOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-1/2 p-4 md:p-8 flex items-start justify-center">
        <div className="w-full max-w-2xl">
          <div className="items-center flex self-center justify-center">
            <img src={logo} alt="logo" />
          </div>

          <h2 className="lg:text-4xl text-neutral-800 md:text-2xl text-xl  font-bold my-6 text-center">
            Class Schedule
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Course Title"
              name="courseTitle"
              type="text"
              onChange={handleInputChange}
              value={formData.courseTitle}
            />
            <Input
              label="Course Code"
              name="courseCode"
              type="text"
              onChange={handleInputChange}
              value={formData.courseCode}
            />
            <div className="relative">
              <Input
                label="Lecture Venue"
                name="lectureVenue"
                type="text"
                value={formData.lectureVenue}
                readOnly
              />
              <button
                type="button"
                onClick={() => setIsMapModalOpen(true)}
                className="btn absolute right-0 top-9 px-3 bg-green-500 text-white rounded-r-md hover:bg-green-600 transition-colors"
              >
                Select Location
              </button>
            </div>
            <Input
              name="time"
              type="time"
              label="Time"
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
            <Input
              label="Note"
              name="note"
              type="text"
              onChange={handleInputChange}
              value={formData.note}
            />
            <button
              type="submit"
              className="w-full btn bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              Generate QR Code
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center overflow-hidden">
        <img
          src={scheduleImg}
          alt="Student"
          className="object-cover w-full h-full max-w-none"
        />
      </div>

      {isMapModalOpen && (
        <MapModal
          onClose={() => setIsMapModalOpen(false)}
          onSelectLocation={handleLocationChange}
        />
      )}

      {isQRModalOpen && (
        <QRCodeModal qrData={qrData} onClose={() => setIsQRModalOpen(false)} />
      )}
    </div>
  );
};

export default ClassSchedule;
