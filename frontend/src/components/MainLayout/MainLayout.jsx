import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
const MainLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default MainLayout;
