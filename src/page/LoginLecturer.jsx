import Logo from "/trackAS.png";
import loginImg from "/LoginLecturer.jpg";
import Input from "../component/Input";
import { Link } from "react-router-dom";

const LoginLecturer = () => {
  return (
    <section>
      <div className="grid md:grid-cols-2 ">
        <div className="px-6 lg:px-[133px] overflow-scroll  h-[100vh] pb-8">
          <img src={Logo} alt="login logo" className="my-24" />
          <form action="">
            <h2 className="text-[#000D46] font-bold text-2xl mt-5 mb-7">
              Wellcome Back!
            </h2>
            <div className="grid gap-y-4">
              <Input
                type={"email"}
                label={"Email"}
                placeholder={"Enter your email address"}
              />
              <Input
                type={"password"}
                label={"Password"}
                placeholder={"Enter your password"}
              />
            </div>
            <p className="mt-6 text-[#000D46] capitalize text-sm text-end">
              forgot password
            </p>
            <button
              className="btn bg-[#000D46] text-white btn-block mt-6 text-base font-bold"
              type="submit"
            >
              Login
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
              Don't have an account?{" "}
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
