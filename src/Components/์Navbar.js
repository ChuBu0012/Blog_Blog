import Logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";
import { getusername, logout } from "../service/authorize";
const Navbar = (props) => {
  const navigate = useNavigate();

  return (
    <nav className="mt-10 px-10 relative">
      <div className="flex justify-center">
        <Link to="/" className=" relative top-[-10px] ">
          <img src={Logo} className=" w-20 md:w-24 xl:w-28 hover:p-1" alt="" />
        </Link>
      </div>
      <ul className="flex justify-around  md:text-xl xl:text-2xl transition-all font-semibold">
        <li>
          <Link
            to="/"
            className="md:hover:text-[1.7rem] md:hover:decoration-2 md:hover:text-red-700 underline decoration-1 underline-offset-2 text-red-800"
          >
            Home
          </Link>
        </li>
        {!getusername() && (
          <li>
            <Link
              to="/login"
              className="md:hover:text-[1.7rem] md:hover:decoration-2 md:hover:text-lime-600 underline decoration-1 underline-offset-2 text-lime-500"
            >
              เข้าสู่ระบบ
            </Link>
          </li>
        )}
        {getusername() && (
          <li className=" md:ml-[55px] xl:ml-[60px]">
            <Link
              to="/Form"
              className="md:hover:text-[1.7rem] md:hover:decoration-2 md:hover:text-cyan-700 underline decoration-1 underline-offset-2 text-cyan-900"
            >
              WriteBlog
            </Link>
          </li>
        )}
        {getusername() && (
          <li>
            <Link
              to="/"
              className="md:hover:text-[1.7rem] md:hover:decoration-2 md:hover:text-red-600 underline decoration-1 underline-offset-2 text-red-500"
              onClick={() => {
                logout(() => navigate("/"));
              }}
            >
              ออกจากระบบ
            </Link>
          </li>
        )}
      </ul>
      <hr className=" my-2 md:my-4 xl:my-6 bg-slate-300" />
    </nav>
  );
};
export default Navbar;
