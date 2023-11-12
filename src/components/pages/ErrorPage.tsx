import Header from "../Header";
import Container from "../ui/Container";

const ErrorPage = () => {
  return (
    <>
      <Header />
      <Container>
        <h1 className="text-center text-6xl font-bold mt-12">
          Page Not Found | Error 404
        </h1>
      </Container>
    </>
  );
};

export default ErrorPage;
