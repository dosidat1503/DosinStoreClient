import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

function UserLayout() {
  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default UserLayout;
