import { Outlet } from "react-router-dom";

import "./styles/aside.css";

export function AppAside() {
  return (
    <aside>
      <nav>
        <ul>
          <li className="aside-row "></li>
          <li className="aside-row "></li>
          <li className="aside-row "></li>
          <li className="aside-row "></li>

          <li className="aside-row "></li>
          <li className="aside-row "></li>
          <li className="aside-row"></li>
          <li className="aside-row"></li>
        </ul>
      </nav>
      {/* <p style={{ padding: '1rem 0' }}>Sidebar items, widgets, etc</p> */}
    </aside>
  );
}
