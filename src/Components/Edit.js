import { useState, useEffect } from "react";
import "./Form.css";
import Navbar from "./์Navbar";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { gettoken } from "../service/authorize";

const Edit = (props) => {
  const navigate = useNavigate()
  const params = useParams();
  const [state, setstate] = useState({
    title: "",
    author: "",
    slug: "",
  });
  const { title, author, slug } = state;
  const [content, setcontent] = useState("");
  const submitContent = (e) => {
    setcontent(e);
  };
  const inputValue = (name) => (e) => {
    setstate({ ...state, [name]: e.target.value });
  };

  //ดึงข้อมูล
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
      .then((res) => {
        const { title, content, author, slug } = res.data;
        setstate({ ...state, title, author, slug });
        setcontent(content);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.slug]);

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API}/blog/${slug}`,
        {
          title,
          content,
          author,
        },
        {
          headers: {
            authorization: `Bearer ${gettoken()}`,
          },
        }
      )
      .then((res) => {
        Swal.fire("Edit Success", "แก้ไขสำเร็จแล้ว Blog! Blog!", "success");
        const { title, content, author, slug } = res.data;
        setstate({ ...state, title, author, slug });
        setcontent(content);
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.error, "error");
      });
      navigate(`/`);
  };

  const showUpdateForm = () => {
    return (
      <form
        onSubmit={submitForm}
        className="flex flex-col justify-center px-10 xl:px-64 2xl:px-80  mt-10"
      >
        {/* ชื่อบทความ */}
        <div>
          <label className=" text-lg mr-2 text-sky-900">ชื่อบทความ: </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={inputValue("title")}
            className="border-2 w-auto text-sm md:px-2 md:py-1 md:text-base outline-none pl-2 pr-1 border-indigo-300 rounded-lg"
          />
        </div>
        {/* รายละเอียดบทความ */}
        <div className="flex flex-col mt-4">
          <label className=" text-lg text-sky-900 mb-1">
            รายละเอียดบทความ:{" "}
          </label>
          <ReactQuill
            value={content}
            onChange={submitContent}
            theme={"snow"}
            placeholder="เขียนรายละเอียดบทความนะ Blog! Blog!"
            className="border-2 text-sm md:text-base outline-none border-indigo-300 rounded"
          />
        </div>
        {/* ผู้แต่ง */}
        <div className="mt-4">
          <label className=" text-lg mr-2 text-sky-900">ผู้แต่ง: </label>
          <input
            id="author"
            type="text"
            onChange={inputValue("author")}
            value={author}
            className="border-2 text-sm md:px-2 md:py-1  md:text-base pl-2 pr-1 outline-none w-44 border-indigo-300 rounded-lg"
          />
        </div>
        <input
          type="submit"
          className="w-52 xl:w-64 xl:p-3 md:w-60 self-center cursor-pointer rounded-2xl mt-10 bg-blue-900 text-orange-200 p-2 font-semibold drop-shadow-lg "
          value={"แก้ไขเลย Blog! Blog!"}
        />
      </form>
    );
  };

  return (
    <div className=" container m-auto">
      <Navbar />
      <h1 className="text-3xl font-semibold text-cyan-900 my-5 text-center">
        เขียนสิ Blog! Blog!
      </h1>
      {showUpdateForm()}
    </div>
  );
};
export default Edit;
