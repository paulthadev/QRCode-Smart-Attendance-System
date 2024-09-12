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
import { Link } from "react-router-dom";
import Footer from "../component/Footer";

const VERCEL_URL = import.meta.env.VITE_VERCEL_URL;

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

    const { courseTitle, courseCode, lectureVenue, time, date, note } =
      formData;

    const registrationLink = `${VERCEL_URL}/studentLogin?courseCode=${encodeURIComponent(
      courseCode
    )}&time=${encodeURIComponent(time)}&lectureVenue=${encodeURIComponent(
      lectureVenue
    )}&lat=${selectedLocationCordinate?.lat}&lng=${
      selectedLocationCordinate?.lng
    }`;

    // Generate QR code with registration link
    const qrCodeDataUrl = await new Promise((resolve) => {
      const svg = document.createElement("div");
      const qrCode = <QRCodeSVG value={registrationLink} size={256} />;
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
    const { data, error } = await supabase
      .from("classes")
      .insert([
        {
          course_title: courseTitle,
          course_code: courseCode,
          time: new Date(`${date}T${time}`).toISOString(),
          date: new Date(date).toISOString(),
          location: locationGeography,
          note: note,
          qr_code: qrCodeDataUrl,
          lecturer_id: lecturerId,
          location_name: lectureVenue,
        },
      ])
      .select("course_id");

    if (error) {
      toast.error(`Error inserting class schedule data, ${error.message}`);
      console.error("Error inserting data:", error);
    } else {
      toast.success("Class schedule created successfully");

      // Extract and use the generated course_id
      const generatedCourseId = data[0]?.course_id;
      const updatedRegistrationLink = `${VERCEL_URL}/attendance?courseId=${encodeURIComponent(
        generatedCourseId
      )}&time=${encodeURIComponent(time)}&courseCode=${encodeURIComponent(
        courseCode
      )}&lat=${selectedLocationCordinate?.lat}&lng=${
        selectedLocationCordinate?.lng
      }`;

      // Set the QR code data and open the QR modal
      setQrData(updatedRegistrationLink);
      setIsQRModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row max-h-[100vh]  bg-gray-100 ">
        <div className="w-full md:w-1/2 p-4 md:p-4 flex items-start justify-center relative">
          <Link to="/classDetails">
            <button className="btn btn-sm rounded-full bg-blue-500 border-none text-white">
              Back
            </button>
          </Link>

          <div className="w-full max-w-2xl h-[90vh] overflow-y-auto">
            <div className="items-center flex self-center justify-center">
              <img src={logo} alt="logo" />
            </div>

            <p className="text-sm text-neutral-600 text-center mb-1">
              Schedule a class using the form below
            </p>
            <form onSubmit={handleSubmit} className="py-0">
              <Input
                label="Course Title"
                name="courseTitle"
                type="text"
                onChange={handleInputChange}
                value={formData.courseTitle}
                required={true}
              />
              <Input
                label="Course Code"
                name="courseCode"
                type="text"
                onChange={handleInputChange}
                value={formData.courseCode}
                required={true}
              />

              <div className="relative">
                <Input
                  label="Lecture Venue"
                  name="lectureVenue"
                  type="text"
                  placeholder="kindly select location"
                  value={formData.lectureVenue}
                  readOnly
                  required={true}
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
                required={true}
              />
              <Input
                name="date"
                type="date"
                label="Date"
                onChange={handleInputChange}
                value={formData.date}
                required={true}
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
          <QRCodeModal
            qrData={qrData}
            onClose={() => setIsQRModalOpen(false)}
          />
        )}
      </div>
      <Footer/>
    </>
  );
};

export default ClassSchedule;
