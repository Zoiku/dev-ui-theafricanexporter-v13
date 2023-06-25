import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";

const Default = ({ session }) => {
  return (
    <>
      <Nav session={session} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Default;
