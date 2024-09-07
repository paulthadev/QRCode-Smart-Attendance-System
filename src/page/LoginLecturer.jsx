import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import Logo from "/trackAS.png";
import loginImg from "/LoginLecturer.jpg";
import Input from "../component/Input";
import { Link } from "react-router-dom";

const LoginLecturer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Sign in the lecturer with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log("Login successful:", data);

      // Redirect the lecturer to the class schedule or dashboard
      navigate("/classSchedule");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="grid md:grid-cols-2">
        <div className="px-6 lg:px-[133px] overflow-scroll h-[100vh] pb-8">
          <img src={Logo} alt="login logo" className="my-24" />
          <form onSubmit={handleLogin}>
            <h2 className="text-[#000D46] font-bold text-2xl mt-5 mb-7">
              Welcome Back!
            </h2>
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
            <p className="mt-6 text-[#000D46] capitalize text-sm text-end">
              forgot password
            </p>
            <button
              className="btn bg-[#000D46] text-white btn-block mt-6 text-base font-bold"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div>
            <div className="flex mt-6 items-center gap-3 justify-center">
              <div className="h-[0.0625rem] w-[7.9375rem] bg-black"></div>
              <p className="text-[#1E1E1E]">login with</p>
              <div className="h-[0.0625rem] w-[7.9375rem] bg-black"></div>
            </div>

            <button className="btn bg-white btn-block mt-6 text-black hover:bg-transparent">
              Continue with Google
            </button>
            <p className="mt-4 text-[#1E1E1E] text-center">
              Don&apos;t have an account?{" "}
              <Link
                className="text-[#000D46] font-semibold"
                to={"/registerLecturer"}
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
        <div>
          <img
            src={loginImg}
            alt="login screen image"
            className="h-[100vh] hidden md:block w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default LoginLecturer;
