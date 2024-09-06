import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Input from "../component/Input";
import Logo from "/trackAS.png";
import registerImg from "/registerImg.jpg";

const RegisterLecturer = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!fullName || !email || !phoneNumber) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // Sign up lecturer using Supabase authentication with email confirmation
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone_number: phoneNumber,
          },
        },
      });

      if (error) throw error;

      console.log("Auth signup successful:", data);

      // Email verification is handled by Supabase, so we don't need to insert data manually
      // The user data will be available in auth.users table

      alert(
        "Registration successful! Please check your email to verify your account."
      );
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="grid md:grid-cols-2">
        <form
          onSubmit={handleRegister}
          className="py-20 px-6 lg:px-[133px] overflow-scroll h-[100vh]"
        >
          <img src={Logo} alt="astrack logo" />
          <h2 className="text-[#000D46] font-bold text-2xl mt-5 mb-7">
            Create Account
          </h2>
          <div className="grid gap-y-4">
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
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
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Input
              type="tel"
              label="Phone Number"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn bg-[#000D46] font-bold text-base text-white btn-block mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="max-[100%] hidden md:block">
          <img
            src={registerImg}
            alt="register hero image"
            className="h-[100vh] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterLecturer;
