import Input from "../component/Input";
import Logo from "/trackAS.png";
import registerImg from "/registerImg.jpg";
import { Link } from "react-router-dom";

const RegisterLecturer = () => {
  return (
    <section>
      <div className="grid md:grid-cols-2  ">
        <form
          action=""
          className=" py-20 px-6 lg:px-[133px] overflow-scroll h-[100vh] "
        >
          <img src={Logo} alt="astrack logo" />
          <h2 className="text-[#000D46] font-bold text-2xl mt-5 mb-7">
            Create Account
          </h2>
          <div className="grid gap-y-4">
            <Input
              type={"text"}
              label={"Full Name"}
              placeholder={"Enter your name"}
            />
            <Input
              type={"email"}
              label={"Email"}
              placeholder={"Enter your email"}
            />

            <Input
              type={"password"}
              placeholder={"Enter your password"}
              label={"Password"}
            />
            <Input
              type={"password"}
              placeholder={"Enter your password"}
              label={"Confurm Password"}
            />

            <Input
              type={"number"}
              placeholder={"Enter your phone number"}
              label={"Phone Number"}
            />
            <Input
              type={"number"}
              placeholder={"Enter your lecturer identification number"}
              label={"Lecturer ID"}
            />
          </div>
          <button className="btn bg-[#000D46] font-bold text-base text-white btn-block mt-4">
            Create Account
          </button>
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
              Already have an Account?{" "}
              <Link
                className="text-[#000D46] font-semibold"
                to={"/loginLecturer"}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
        <div className=" max-[100%]  hidden md:block">
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
