import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import toast from "react-hot-toast";

const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (session && session.user) {
          const userEmail = session.user.email;

          const { data: userData, error: userError } = await supabase
            .from("lecturers")
            .select("*")
            .eq("email", userEmail)
            .single();

          if (userError) {
            if (userError.code === "PGRST116") {
              setError("User details not found.");
            } else {
              throw userError;
            }
          } else if (userData) {
            setUserDetails(userData);
          }
        } else {
          setError("User is not logged in.");
        }
      } catch (error) {
        toast.error(
          `${`${
            error.message === "TypeError: Failed to fetch"
              ? "Please, check your Internet connection"
              : error.message
          }`}`
        );
        setError(
          `${
            error.message === "TypeError: Failed to fetch"
              ? "Please, check your Internet connection"
              : error.message
          }`
        );
      }
    };

    fetchUserDetails();
  }, []);

  return { userDetails, userDetailsError: error };
};

export default useUserDetails;
