import { Outlet } from "react-router";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import endPoints from "../constant/endPoints";
import { useFetchData } from "./../hooks/useFetchData";

const Layout = () => {
  const { data } = useFetchData({
    endPoints: endPoints.contentType,
    ordering: { priority: "priority" },
  });

  return (
    <>
      <Header types={data?.data} />

      <main style={{ minHeight: "70vh" }}>
        <Outlet context={{ types: data?.data }} />
      </main>
      <Footer types={data?.data} />
    </>
  );
};

export default Layout;
