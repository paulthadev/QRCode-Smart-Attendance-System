import Input from "../component/Input";

const StudentLogin = () => {
  return (
    <section className="studentLogin h-[100vh] grid place-items-center ">
      <div className="bg-white px-6 py-4 md:px-24 md:py-12   rounded-xl">
        <form action="max-w-[50rem]">
          <h2 className="text-[2.5rem] text-[#000D46] text-center font-bold mb-8">
            ClassTrakka
          </h2>

          <Input
            type={"text"}
            label="Matriculation Number"
            placeholder={"Your matriculation number"}
          />
          <button className="btn btn-block mt-4 bg-[#000D46] text-white">
            Check Lecturer Schedule
          </button>
        </form>
      </div>
    </section>
  );
};
export default StudentLogin;
