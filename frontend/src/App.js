import './App.css';
import Header from "./components/Header";
import React from "react";
import { Routes, Route } from 'react-router-dom';
import Auth from "./components/Auth";
import AllBlogs from "./components/AllBlogs";
import UserBlog from "./components/UserBlog";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";

function App() {
  return <React.Fragment>
    <header>
      <Header />
    </header>
    <main>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/allblogs" element={<AllBlogs />} />
        <Route path="/allblogs/add" element={<AddBlog />} />
        <Route path="/userblogs" element={<UserBlog />} />
        <Route path="/userblogs/:id" element={<BlogDetail />} />
      </Routes>
    </main>
  </React.Fragment>;
}

export default App;
