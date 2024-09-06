import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get("token");
      const type = searchParams.get("type");

      console.log("Verification started", { token, type });

      if (token && type === "signup") {
        try {
          // Instead of using verifyOtp, we'll use the token to sign in
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: "signup",
          });

          if (error) throw error;

          console.log("Verification successful", data);

          // After successful verification, get the user data
          const {
            data: { user },
            error: userError,
          } = await supabase.auth.getUser();
          if (userError) throw userError;

          console.log("User data retrieved", user);

          if (user) {
            // Check if the user already exists in the lecturers table
            const { data: existingLecturer, error: checkError } = await supabase
              .from("lecturers")
              .select()
              .eq("id", user.id)
              .single();

            if (checkError && checkError.code !== "PGRST116") {
              throw checkError;
            }

            if (!existingLecturer) {
              // Insert the user into the lecturers table
              const { error: insertError } = await supabase
                .from("lecturers")
                .insert({
                  id: user.id,
                  name: user.user_metadata.full_name,
                  email: user.email,
                  phone_number: user.user_metadata.phone_number,
                });

              if (insertError) throw insertError;

              console.log("Lecturer inserted successfully");
            } else {
              console.log("Lecturer already exists in the table");
            }

            setStatus("Email verified successfully!");
            setTimeout(() => navigate("/classSchedule"), 2000);
          }
        } catch (error) {
          console.error("Verification error:", error);
          console.error("Error details:", JSON.stringify(error, null, 2));
          setStatus(`Verification failed: ${error.message}`);
        }
      } else {
        setStatus("Invalid verification link");
      }
    };

    verifyEmail();
  }, [location.search, navigate]);

  return <div>{status}</div>;
};

export default EmailVerification;
