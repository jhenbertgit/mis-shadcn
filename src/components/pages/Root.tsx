import { Outlet } from "react-router-dom";
import Header from "../Header";
import Container from "../ui/Container";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default RootLayout;
