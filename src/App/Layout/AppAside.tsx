import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

import "./styles/aside.css";

export function AppAside() {
  return (
    <aside>
      <nav>
        <ul>
          <li className="aside-row ">
            <NavLink to="dashboard">Dashboard</NavLink>
          </li>          
          <li className="aside-row ">
            <NavLink to="Technology">Technologia</NavLink>
          </li>
        </ul>
      </nav>
      {/* <p style={{ padding: '1rem 0' }}>Sidebar items, widgets, etc</p> */}
    </aside>
  );
}
