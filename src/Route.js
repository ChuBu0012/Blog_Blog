import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import React, { Fragment } from "react";
import Form from "./Components/Form";
import Blog from "./Components/singleblog";
import Edit from "./Components/Edit";
import Login from "./Components/Login";
import AdminRoute from "./AdminRoute";
const MyRoute = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" exact element={<App />}></Route>

          <Route exact path="/" element={<AdminRoute />}>
            <Route path="/Form" exact element={<Form />}></Route>
          </Route>
          
          <Route path="/blog/:slug" exact element={<Blog />}></Route> 

          <Route exact path="/" element={<AdminRoute />}>
            <Route path="/blog/edit/:slug" exact element={<Edit />}></Route>
          </Route>

          <Route path="/login" exact element={<Login />}></Route>
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};
export default MyRoute;
