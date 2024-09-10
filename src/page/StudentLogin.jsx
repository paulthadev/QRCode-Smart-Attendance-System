import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { calculateDistance } from "../utils/distanceCalculation";
import Input from "../component/Input";
import { supabase } from "../utils/supabaseClient";
import toast from "react-hot-toast";

const StudentLogin = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [userDistance, setUserDistance] = useState(null);
  const [isWithinRange, setIsWithinRange] = useState(false);
  const [classDetails, setClassDetails] = useState(null);
  const [matricNumber, setMatricNumber] = useState("");
  const [name, setName] = useState("");

  const courseId = queryParams.get("courseId");
  const time = queryParams.get("time");
  const courseCode = queryParams.get("courseCode");
  const lat = parseFloat(queryParams.get("lat"));
  const lng = parseFloat(queryParams.get("lng"));

  useEffect(() => {
    // Function to get class details
    const fetchClassDetails = async () => {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .eq("course_id", courseId)
        .single();

      if (error) {
        console.error("Error fetching class details:", error);
      } else {
        setClassDetails(data);
      }
    };

    fetchClassDetails();
  }, [courseId]);

  useEffect(() => {
    // Function to get the user's current location
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Calculate distance
            const distance = calculateDistance(userLat, userLng, lat, lng);
            setUserDistance(distance);

            // Check if the distance is within 20 meters
            setIsWithinRange(distance <= 216457.79);
          },
          (error) => {
            toast.error(`Error getting user location., ${error.message}`);
          }
        );
      } else {
        toast.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, [lat, lng]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!matricNumber) {
      toast.error("Matriculation number is required.");
      return;
    }

    const { data, error } = await supabase
      .from("classes")
      .select("attendees")
      .eq("course_id", courseId)
      .single();

    if (error) {
      toast.error(`Error fetching class data: ${error.message}`);
      return;
    }

    const { attendees = [] } = data;
    const newAttendee = {
      matric_no: matricNumber.toUpperCase(),
      name: name.toUpperCase(),
      timestamp: new Date().toISOString(),
    };

    const updatedAttendees = [...attendees, newAttendee];

    const { error: updateError } = await supabase
      .from("classes")
      .update({ attendees: updatedAttendees })
      .eq("course_code", courseCode);

    if (updateError) {
      toast.error(`Error marking attendance: ${updateError.message}`);
    } else {
      toast.success("Attendance marked successfully.");
    }
  };

  return (
    <section className="studentLogin h-[100vh] grid place-items-center ">
      <div className="bg-white px-6 py-4 md:px-16  rounded-xl">
        <h2 className="text-[2.5rem] text-[#000D46] text-center font-bold mb-2">
          TrackAS
        </h2>
        {classDetails && (
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[#000D46] text-lg font-bold">
                Title {classDetails.course_title}
              </p>

              <p className="text-[#000D46] text-lg font-bold">
                Code: {courseCode}
              </p>

              <p>
                <p className="text-[#000D46] text-lg font-bold">
                  Venue: {classDetails.location_name}
                </p>
                <p className="text-[#000D46] text-lg font-bold">
                  Date: {classDetails.date}
                </p>
                <p className="text-[#000D46] text-lg font-bold">Time: {time}</p>
                <p className="text-[#000D46] text-lg font-bold">
                  Note: {classDetails.note}
                </p>
                <br />
                Distance to Lecture Venue:{" "}
                {userDistance
                  ? `${userDistance.toFixed(2)} meters`
                  : "Calculating..."}
              </p>
            </div>
          </div>
        )}
        <form onSubmit={handleRegister}>
          <Input
            type="text"
            name="name"
            label="Name"
            placeholder={"Enter your name"}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="text"
            name="matricNumber"
            label="Matriculation Number"
            placeholder={"Your matriculation number"}
            onChange={(e) => setMatricNumber(e.target.value)}
          />

          {isWithinRange ? (
            <button className="btn my-5 btn-block text-lg" type="submit">
              Mark Attendance
            </button>
          ) : (
            <p>
              You must be within 20 meters of the lecture venue to register.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default StudentLogin;
