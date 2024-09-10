import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterLecturer from "./page/RegisterLecturer";
import LoginLecturer from "./page/LoginLecturer";
import ClassSchedule from "./page/ClassSchedule";
import LandingPage from "./page/LandingPage";
import Attendance from "./page/Attendance";
import SuccessPage from "./page/SuccessPage";

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
    path: "/success",
    element: <SuccessPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
