import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { calculateDistance } from "../utils/distanceCalculation";
import Input from "../component/Input";

const StudentLogin = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [userDistance, setUserDistance] = useState(null);
  const [isWithinRange, setIsWithinRange] = useState(false);

  const courseCode = queryParams.get("courseCode");
  const time = queryParams.get("time");
  const lectureVenue = queryParams.get("lectureVenue");
  const lat = parseFloat(queryParams.get("lat")); // Parse the latitude as a float
  const lng = parseFloat(queryParams.get("lng")); // Parse the longitude as a float

  useEffect(() => {
    // Function to get the user's current location
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Calculate distance using the imported function
            const distance = calculateDistance(userLat, userLng, lat, lng);

            setUserDistance(distance);

            // Check if the distance is within 20 meters
            if (distance <= 20) {
              setIsWithinRange(true);
            } else {
              setIsWithinRange(false);
            }
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
  }, [lat, lng]); // Trigger the useEffect when the lat and lng change

  return (
    <section className="studentLogin h-[100vh] grid place-items-center ">
      <div className="bg-white px-6 py-4 md:px-24 md:py-12 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[#000D46] text-lg font-bold">{courseCode}</p>
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
              You must be within 20 meters of the lecture venue to register.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default StudentLogin;
