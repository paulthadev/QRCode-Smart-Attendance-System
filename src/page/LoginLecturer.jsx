import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import Logo from "/trackAS.png";
import loginImg from "/LoginLecturer.jpg";
import Input from "../component/Input";
import { Link } from "react-router-dom";
import Spinner from "../component/Spinner";
import toast from "react-hot-toast";

const LoginLecturer = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Sign in the lecturer with email and password
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Redirect to the class schedule
      toast.success("Login successful");
      navigate("/classDetails");
    } catch (error) {
      setError(error.error_description || error.message);
      toast.error(`${error.error_description || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="grid md:grid-cols-2">
        <div className="px-6 lg:px-[133px] overflow-scroll h-[100vh] pb-8">
          <div className="flex flex-col mt-5 items-center">
            <img src={Logo} alt="login logo" className="w-32" />
            <h2 className="text-[#000D46] font-bold text-2xl mt-2 mb-6">
              Welcome Back!
            </h2>
          </div>
          <form onSubmit={handleLogin}>
            <div className="grid gap-y-4">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              className="btn bg-[#000D46] disabled:bg-[#000D46] disabled:cursor-not-allowed text-white btn-block mt-6 text-base font-bold"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Login"}
            </button>
          </form>

          <p className="mt-3 text-[#1E1E1E] text-center">
            Don&apos;t have an account?{" "}
            <Link
              className="text-[#000D46] font-semibold"
              to={"/registerLecturer"}
            >
              Register Now
            </Link>
          </p>
        </div>

        {/* Start of  Side Image (only shown on Large screen) */}
        <div>
          <img
            src={loginImg}
            alt="login screen image"
            className="h-[100vh] hidden md:block w-full object-cover"
          />
        </div>
      </div>

      {/* End of  Side Image (only shown on Large screen) */}
    </section>
  );
};

export default LoginLecturer;
