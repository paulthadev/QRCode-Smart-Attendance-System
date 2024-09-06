import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterLecturer from "./page/RegisterLecturer";
import LoginLecturer from "./page/LoginLecturer";
import ClassSchedule from "./page/ClassSchedule";
import EmailVerification from "./component/EmailVerification";

const router = createBrowserRouter([
  {
    path: "/",
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
  {
    path: "/auth/v1/verify",
    element: <EmailVerification />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
