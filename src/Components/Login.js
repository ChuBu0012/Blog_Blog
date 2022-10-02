import { useState, useEffect } from "react";
import "./Form.css";
import Navbar from "./์Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css";
import { authenticate, getusername } from "../service/authorize";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const [state, setstate] = useState({
    username: "",
    password: "",
  });
  const { username, password } = state;

  const inputValue = (name) => (e) => {
    setstate({ ...state, [name]: e.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API}/login`, { username, password })
      .then((res) => {
        authenticate(res, ()=> navigate("/Form"));
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.error, "error");
      });
  };

  useEffect(()=>{
    getusername() && navigate('/')
  },[])

  return (
    <div className=" container m-auto">
      <Navbar />
      <h1 className="text-3xl font-semibold text-cyan-900 my-5 text-center">
        เข้าสู่ระบบ | Admin
      </h1>
      <form
        onSubmit={submitForm}
        className="flex flex-col md:items-center justify-center px-10 xl:px-64 2xl:px-80  mt-10"
      >
        {/* ชื่อบทความ */}
        <div>
          <label className=" text-lg mr-2 text-sky-900">Username: </label>
          <input
            id="title"
            type="text"
            value={username}
            onChange={inputValue("username")}
            className="border-2 w-auto text-sm md:px-2 md:py-1 md:text-base outline-none pl-2 pr-1 border-indigo-300 rounded-lg"
          />
        </div>
        {/* ผู้แต่ง */}
        <div className="mt-4">
          <label className=" text-lg mr-3 text-sky-900">Password: </label>
          <input
            id="password"
            type="password"
            onChange={inputValue("password")}
            autoComplete="on"
            value={password}
            className="border-2 text-sm md:px-2 md:py-1  md:text-base pl-2 pr-1 outline-none border-indigo-300 rounded-lg"
          />
        </div>
        <input
          type="submit"
          className="w-52 xl:w-64 xl:p-3 md:w-60 self-center cursor-pointer rounded-2xl mt-10 bg-blue-900 text-orange-200 p-2 font-semibold drop-shadow-lg "
          value={"เข้าสู่ระบบ Blog! Blog!"}
        />
      </form>
    </div>
  );
};
export default Login;
