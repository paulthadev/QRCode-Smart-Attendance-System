import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterLecturer from "./page/RegisterLecturer";
import LoginLecturer from "./page/LoginLecturer";
import ClassSchedule from "./page/ClassSchedule";

const router = createBrowserRouter([
  {
    path: "/registerLecturer",
    element: <RegisterLecturer />,
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
