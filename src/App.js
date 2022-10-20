import Navbar from "./Components/์Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import { getusername, gettoken } from "./service/authorize";
import "./App.css";
function App() {
  const [Allblogs, setAllblogs] = useState([]);
  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((res) => {
        setAllblogs(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "ต้องการลบบทความใช่มุ้ย",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };
  const deleteBlog = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/blog/${slug}`, {
        headers: {
          authorization: `Bearer ${gettoken()}`,
        },
      })
      .then((res) => {
        Swal.fire({
          title: "ลบบทความนี้เรียบร้อย!",
          icon: "success",
        });
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const optionDate = { dateStyle: "medium", timeStyle: "short" };
  return (
    <div className=" container m-auto">
      <Navbar />
      <div className="mt-5 flex flex-col-reverse">
        {Allblogs.map((blog, index) => {
          let dividingline = "<div class='my-10'></div>";
          if (index !== 0) {
            dividingline = "<hr className='my-7'/>";
          }
          return (
            <div className="" key={index}>
              <div className="px-10">
                <Link to={`/blog/${blog.slug}`}>
                  <h1 className=" text-xl md:text-2xl xl:text-3xl font-semibold text-blue-900">
                    {blog.title}
                  </h1>
                </Link>
                <p className="md:text-[1rem] xl:text-[1.05rem] md:mt-1 ml-[25px]">
                  {parse(blog.content.substring(0, 258))}
                  <Link
                    className=" font-bold animate-pulse"
                    to={`/blog/${blog.slug}`}
                  >
                    ...อ่านต่อ
                  </Link>
                </p>
                <h2 className="text-sm md:text-base xl:text-lg mt-3 opacity-60  text-zinc-900">
                  ผู้เขียน: {blog.author}
                  <br />
                  เขียนเมื่อ: {new Date(blog.updatedAt).toLocaleString('th-TH',optionDate)}
                </h2>
                {getusername() && (
                  <div className="mt-3">
                    <Link
                      to={`/blog/edit/${blog.slug}`}
                      className="border-2 p-1 rounded hover:bg-yellow-600 hover:text-white text-yellow-600 border-yellow-600"
                    >
                      แก้ไขบทความ
                    </Link>
                    <button
                      className="ml-2 border-2 p-1 rounded hover:bg-red-600 hover:text-white text-red-600 border-red-600"
                      onClick={() => confirmDelete(blog.slug)}
                    >
                      ลบบทความ
                    </button>
                  </div>
                )}
                {parse(dividingline)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
