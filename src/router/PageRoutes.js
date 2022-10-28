import React,{useEffect} from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Management from "../views/management";
import PDFReader from "../views/pdfReader";
import Login from "../views/login";
const PageRoutes = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const userId = window.localStorage.getItem("userId");
    if (userId === null) navigate("/login");
  }, []) 
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/management/" replace />} />
      <Route path="/login" element={<Login/> } />
      <Route path="/management/*" element={<Management />} />
      <Route path="/pdf-reader" element={<PDFReader />} />
    </Routes>
  );
};

export default PageRoutes;
