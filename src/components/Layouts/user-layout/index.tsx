import Header from "@/features/header/components/header";
import Footer from "@/features/header/components/footer";
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
