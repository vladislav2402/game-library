import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Admin } from "./pages/Admin";
import { Header } from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import { Library } from "./pages/Library";
import { LibraryCreateBook } from "./pages/LibraryCreateBook";
import { SubjectCreate } from "./pages/SubjectCreate";
import { Teachers } from "./pages/Teachers";
import { Subjects } from "./pages/Subjects";
import { Schedule } from "./pages/Schedule";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<Admin />} />


        <Route path="/teachers" element={<Teachers />} />
        <Route path="/subject/create" element={<SubjectCreate />} />
        <Route path="/subject" element={<Subjects />} />
        <Route path="/profile" element={<Admin />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/library/create" element={<LibraryCreateBook />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </div>
  );
}

export default App;
