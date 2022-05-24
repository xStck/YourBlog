import './App.css';
import Header from "./components/Header";
import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Auth from "./components/Auth";
import AllBlogs from "./components/AllBlogs";
import UserBlog from "./components/UserBlog";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from './store';

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatcher = useDispatch();
  useEffect(() => {
    if(localStorage.getItem("userId")){
      dispatcher(authActions.login())
    }
  },[dispatcher])
  return <React.Fragment>
    <header>
      <Header />
    </header>
    <main>
      <Routes>
        {!isLoggedIn ? (
          <Route path="/auth" element={<Auth />} />
        ) : (
          <>
            <Route path="/allblogs" element={<AllBlogs />} />
            <Route path="/allblogs/add" element={<AddBlog />} />
            <Route path="/userblogs" element={<UserBlog />} />
            <Route path="/userblogs/:id" element={<BlogDetail />} />
          </>
        )
        }
      </Routes>
    </main>
  </React.Fragment>;
}

export default App;
