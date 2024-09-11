import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterLecturer from "./page/RegisterLecturer";
import LoginLecturer from "./page/LoginLecturer";
import ClassSchedule from "./page/ClassSchedule";
import LandingPage from "./page/LandingPage";
import Attendance from "./page/Attendance";
import SuccessPage from "./page/SuccessPage";
import ClassDetails from "./page/ClassDetails";
import PreviousClass from "./page/PreviousClass";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    index: true,
  },
  {
    path: "/registerLecturer",
    element: <RegisterLecturer />,
  },
  {
    path: "/classDetails",
    element: <ClassDetails />,
  },
  {
    path: "/attendance",
    element: <Attendance />,
  },
  {
    path: "/loginLecturer",
    element: <LoginLecturer />,
  },
  {
    path: "/classSchedule",
    element: <ClassSchedule />,
  },
  {
    path: "/previousClass",
    element: <PreviousClass />,
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
