import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterLecturer from "./page/RegisterLecturer";
import LoginLecturer from "./page/LoginLecturer";
import ClassSchedule from "./page/ClassSchedule";
import LandingPage from "./page/LandingPage";
import StudentLogin from "./page/StudentLogin";

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
    path: "/studentLogin",
    element: <StudentLogin />,
  },
  {
    path: "/loginLecturer",
    element: <LoginLecturer />,
  },
  {
    path: "/classSchedule",
    element: <ClassSchedule />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
