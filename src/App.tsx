import { useState } from "react";
import reactLogo from "./assets/react.svg";
import djangologo from "./assets/djangologo.svg";
import ItemsToPlanList from "./App/ItemsToPlan/App";
// import "./App.css";
import  HomePage from "./App/HomePage/index"
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "./App/Layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout withSidebar />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard/*" element={<HomePage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
