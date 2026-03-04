import { Outlet } from "react-router";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />

      <main style={{ minHeight: "70vh" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
