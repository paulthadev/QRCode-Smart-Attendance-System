import { Check } from "iconsax-react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessPage = () => {
  return (
    <section className="successPage h-[100vh] grid place-items-center bg-green-100">
      <div className="bg-white px-6 py-8 md:px-12 md:py-16 rounded-xl shadow-lg text-center">
        <Check className="text-green-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold text-green-800 mb-4">Success!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Your attendance has been marked successfully. Thank you!
        </p>
        <div className="btn bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
          <FaCheckCircle />
        </div>
      </div>
    </section>
  );
};

export default SuccessPage;
