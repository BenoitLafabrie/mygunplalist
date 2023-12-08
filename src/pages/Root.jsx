import BottomNavBar from "../components/BottomNavBar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Root() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        minHeight: "calc(100vh - 7.5vh)",
        overflow: "auto",
      }}
    >
      <Header />
      <Outlet />
      <Footer />
      <BottomNavBar />
    </div>
  );
}
