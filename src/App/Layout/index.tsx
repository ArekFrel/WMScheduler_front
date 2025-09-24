import React from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";
import { ErrorBoundary } from "./ErrorBoundary";
import "./styles/layout.css";
import { AppAside } from "./AppAside";

function getLayoutClassName(withSidebar?: boolean): string {
  return withSidebar ? "layout with-sidebar" : "layout";
}

type LayoutProps = {
  withSidebar?: boolean;
};

export const Layout: React.FC<LayoutProps> = ({ withSidebar }) => {
  return (
    <ErrorBoundary>
      <div className={getLayoutClassName(withSidebar)}>
        <AppHeader />
        {withSidebar && <AppAside />}
        <main>
          <Outlet />
        </main>
        {/* <AppFooter /> */}
      </div>
    </ErrorBoundary>
  );
};
