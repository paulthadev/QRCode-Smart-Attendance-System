import logo from "/trackAS.png";

const Footer = () => {
  return (
    <section className="   w-full  bg-white py-4 text-black px-6">
      <div className="flex  flex-col md:flex-row gap-y-6 justify-between items-center max-w-7xl mx-auto  ">
        <div className="">
          {/* <img src={logo} alt="logo" /> */}
          <h2 className="font-bold text-2xl text-black uppercase pb-4">
            TRACK AS
          </h2>
          <p className="max-w-[30rem]">
            track AS is a platform that allows you to create class schedule and
            also take student attendance
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 ">
          <img src={logo} alt="" className="h-24 w-24" />
          <div className="capitalize">
            <p className="pb-4">
              in partial fulfillment of final year project, federal university
              of technology akure
            </p>
            <p>department of software engineering , school of computing </p>
            <span className="pb-3">
              <span className="font-bold">name:</span>Ozioko Ogechi Maureen{" "}
            </span>
            <span>
              <span className="font-bold">matric:</span>IFT/18/6029
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
