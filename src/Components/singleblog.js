import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./์Navbar";
import parse from 'html-react-parser';

const Singleblog = (props) => {
  const { slug } = useParams();
  const [blog, setblog] = useState({});
  const [content, setcontent] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then((res) => {
        setblog(res.data);
        setcontent(res.data.content)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);
  return (
    <div className=" container m-auto">
      <Navbar />

      {blog && (
        <div className="px-10">
          <h1 className="text-center mt-3 text-xl md:text-2xl xl:text-3xl font-semibold text-blue-900">
            {blog.title}
          </h1>

          <p className="md:px-[2.15rem] md:text-justify mt-2 md:text-[1.05rem] xl:text-[1.05rem] md:mt-3">
          {parse(content)}
          </p>
          <h2 className="md:px-5 text-sm md:text-base xl:text-lg mt-3 opacity-60  text-zinc-900">
            ผู้เขียน: {blog.author}
            <br />
            เขียนเมื่อ: {new Date(blog.updatedAt).toLocaleString()}
          </h2>
        </div>
      )}
    </div>
  );
};
export default Singleblog;
