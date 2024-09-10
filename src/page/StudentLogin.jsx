import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { calculateDistance } from "../utils/distanceCalculation";
import Input from "../component/Input";
import { supabase } from "../utils/supabaseClient";

const StudentLogin = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [userDistance, setUserDistance] = useState(null);
  const [isWithinRange, setIsWithinRange] = useState(false);
  const [classDetails, setClassDetails] = useState(null);

  const courseId = queryParams.get("courseId");
  const time = queryParams.get("time");
  const lectureVenue = queryParams.get("lectureVenue");
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
            setIsWithinRange(distance <= 3000);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, [lat, lng]);

  return (
    <section className="studentLogin h-[100vh] grid place-items-center ">
      <div className="bg-white px-6 py-4 md:px-24 md:py-12 rounded-xl">
        {classDetails && (
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[#000D46] text-lg font-bold">
                {classDetails.course_title}
              </p>
              <p className="text-[#000D46] text-lg font-bold">{time}</p>
              <p className="text-[#000D46] text-lg font-bold">{lectureVenue}</p>
              <p>
                Distance to Lecture Venue:{" "}
                {userDistance
                  ? `${userDistance.toFixed(2)} meters`
                  : "Calculating..."}
              </p>
            </div>
          </div>
        )}
        <form action="max-w-[50rem]">
          <h2 className="text-[2.5rem] text-[#000D46] text-center font-bold mb-8">
            TrackAS
          </h2>

          <Input
            type={"text"}
            label="Matriculation Number"
            placeholder={"Your matriculation number"}
          />
          {isWithinRange ? (
            <button className="btn">Register for Class</button>
          ) : (
            <p>
              You must be within 3000 meters of the lecture venue to register.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default StudentLogin;
