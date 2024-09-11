import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
  const logout = useLogout();

  return (
    <button
      onClick={logout}
      className="bg-red-500 hover:bg-blue-800 text-white px-2 py-1 rounded-full text-sm"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
