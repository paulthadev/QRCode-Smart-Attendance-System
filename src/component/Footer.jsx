import logo from "/futa-logo.png";

const Footer = () => {
  return (
    <section className="w-full bg-white py-6 text-black px-4">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-8">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="font-bold text-lg text-black pb-2">TrackAS</h2>
          <p className="text-sm max-w-sm">
            TrackAS is a platform that allows you to create class schedules and
            take student attendance efficiently.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
          <img
            src={logo}
            alt="TrackAS Logo"
            className="h-20 w-20 object-contain"
          />
          <div className="text-xs">
            <p className="pb-2">
              In partial fulfillment of final year project, Federal University
              of Technology, Akure
            </p>
            <p className="pb-2">
              Department of Information Technology, School of Computing
            </p>
            <p className="pb-1">
              <span className="font-bold">Name:</span> Ozioko Ogechi Maureen
            </p>
            <p>
              <span className="font-bold">Matric:</span> IFT/18/6029
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
