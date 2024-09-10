// useLogout.js
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient"; // Adjust the path as needed
import toast from "react-hot-toast";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error.message);
      toast.error(`Error logging out: ${error.message}`);
      return;
    }

    toast.success("Logged out successfully");
    navigate("/");
  };

  return logout;
};

export default useLogout;
