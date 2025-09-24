import { useState } from "react";
import reactLogo from "../../assets/react.svg";
import djangologo from "../../assets/djangologo.svg";
import ItemsToPlanList from "../ItemsToPlan/App";
import "./App.css";

function HomePage() {
  const [count, setCount] = useState(0);

  return <ItemsToPlanList />;
}

export default HomePage;
