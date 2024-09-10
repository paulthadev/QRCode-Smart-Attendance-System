import { useState } from "react";
import Input from "../component/Input";
import MapModal from "../component/MapModal";
import QRCodeModal from "../component/QRCodeModal";
import scheduleImg from "../../public/scheduleImg.jpg";
import logo from "../../public/trackAS.png";
import { supabase } from "../utils/supabaseClient";
import useUserDetails from "../hooks/useUserDetails";
import { QRCodeSVG } from "qrcode.react";
import toast from "react-hot-toast";

const ClassSchedule = () => {
  const { userDetails } = useUserDetails();

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

  const lecturerId = userDetails?.lecturer_id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let locationGeography = null;
    if (selectedLocationCordinate) {
      locationGeography = `SRID=4326;POINT(${selectedLocationCordinate.lng} ${selectedLocationCordinate.lat})`;
    }

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

    // Generate QR code as a data URL
    const qrCodeDataUrl = await new Promise((resolve) => {
      const svg = document.createElement("div");
      const qrCode = <QRCodeSVG value={simpleText} size={256} />;
      import("react-dom/client").then((ReactDOM) => {
        ReactDOM.createRoot(svg).render(qrCode);
        setTimeout(() => {
          const svgString = new XMLSerializer().serializeToString(
            svg.querySelector("svg")
          );
          const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
          resolve(dataUrl);
        }, 0);
      });
    });

    // Save the data to Supabase
    const { data, error } = await supabase.from("classes").insert([
      {
        course_title: formData.courseTitle,
        course_code: formData.courseCode,
        time: new Date(`${formData.date}T${formData.time}`).toISOString(),
        date: new Date(formData.date).toISOString(),
        location: locationGeography,
        note: formData.note,
        qr_code: qrCodeDataUrl,
        lecturer_id: lecturerId,
        location_name: formData.lectureVenue,
      },
    ]);
    console.log(data);

    if (error) {
      toast.error(`Error inserting class schedule data, ${error.message}`);
      console.error("Error inserting data:", error);
    } else {
      toast.success("Class schedule created successfully");
    }

    // Set the QR code data and open the QR modal
    setQrData(simpleText);
    setIsQRModalOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row max-h-[90vh]  bg-gray-100">
      <div className="w-full md:w-1/2 p-4 md:p-4 flex items-start justify-center">
        <div className="w-full max-w-2xl h-[90vh] overflow-y-auto">
          <div className="items-center flex self-center justify-center">
            <img src={logo} alt="logo" />
          </div>

          <h2 className="lg:text-4xl text-neutral-800 md:text-2xl text-xl font-bold my-6 text-center">
            Class Schedule
          </h2>
          <form onSubmit={handleSubmit} className="py-0">
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
              className="w-full btn bg-blue-500 text-white hover:bg-blue-600 transition-colors mt-4"
            >
              Generate QR Code
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 h-screen items-center justify-center overflow-hidden">
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
