import { useState } from "react";
import Input from "../component/Input";
import MapModal from "../component/MapModal";
import QRCodeModal from "../component/QRCodeModal";

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
    <div className="p-4">
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
          type="note"
          onChange={handleInputChange}
          value={formData.note}
        />

        <button type="submit" className="btn bg-blue-500 text-white">
          Generate QR Code
        </button>
      </form>

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
