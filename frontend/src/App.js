import './App.css';
import Header from "./components/Header";
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
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
      <Header/>
    </header>
    <main>
      <Routes>
        {!isLoggedIn ? (
          <>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/allblogs" element={<Navigate replace to="/login" />} />
          <Route path="/allblogs/add" element={<Navigate replace to="/login" />} />
          <Route path="/userblogs" element={<Navigate replace to="/login" />} />
          <Route path="/userblogs/:id" element={<Navigate replace to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate replace to="/allblogs" />} />
            <Route path="/login" element={<Navigate replace to="/allblogs" />} />
            <Route path="/signup" element={<Navigate replace to="/allblogs" />}  />
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
