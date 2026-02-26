import { Outlet } from "react-router";
import Header from "./header/Header";

const Layout = () => {
  return (
    <>
      <Header />

      <main style={{ minHeight: "70vh" }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
