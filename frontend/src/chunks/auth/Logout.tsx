import { logout } from "../../util/auth";

const Logout = () => {
  logout();
  window.location.reload();
  return null;
};

export default Logout;
