import { useState } from "react";
import reactLogo from "./assets/react.svg";
import djangologo from "./assets/djangologo.svg";
import ItemsToPlanList from "./App/ItemsToPlan/App";
import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "./App/Layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path ="" element = {<Layout withSidebar/>}>
        <div className="App">
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
            <a
              href="https://www.djangoproject.com/start/overview"
              target="_blank"
            >
              <img src={djangologo} className="logo" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React + Django</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
          <ItemsToPlanList />
        </div>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
