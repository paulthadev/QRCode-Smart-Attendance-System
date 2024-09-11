const PreviousClass = () => {
  return (
      <section className="py-20 px-6">
          <h2 className="text-center font-bold text-2xl mb-6 text-black capitalize">list of previous classes</h2>
          {/* map */}
      <div className="grid mb-6 md:grid-cols-4">
        <div>
          <h2 className="font-bold text-black">Course code</h2>
          <div>rsg504</div>
        </div>
        <div>
          <h2 className="font-bold text-black">Course Title</h2>
          <div>computer science</div>
        </div>
        <div>
          <h2 className="font-bold text-black">Date </h2>
          <div>12AM</div>
        </div>
        <div>
          <h2 className="font-bold text-black">Attendance List</h2>
          <button className="btn capitalize btn-sm font-bold text-white">
            view attendance
          </button>
        </div>
      </div>
      {/* <h3>hello</h3> */}
    </section>
  );
};
export default PreviousClass;
