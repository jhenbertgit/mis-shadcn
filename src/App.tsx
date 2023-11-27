import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ThreatGrpEvents from "./components/pages/ThreatGrpEvents";
import BdpBrgy from "./components/pages/BdpBrgy";
import Latlong from "./components/pages/Latlong";
import RpsbDeployment from "./components/pages/RpsbDeployment";
import ErrorPage from "./components/pages/ErrorPage";
import RootLayout from "./components/pages/Root";
import { useEffect } from "react";
import Test from "./components/pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />, //fallback page if error occurs
    children: [
      {
        index: true,
        element: <ThreatGrpEvents />,
      },
      { path: "bdp", element: <BdpBrgy /> },
      { path: "latlong", element: <Latlong /> },
      { path: "rpsb", element: <RpsbDeployment /> },
      { path: "test", element: <Test /> },
    ],
  },
]);

function App() {
  useEffect(() => {
    const dynamicTitle = () => {
      const path = location.pathname;
      const fullPathName = path.split("/");
      const pathName = fullPathName[fullPathName.length - 1];
      const pageTitle = `ID APC-EM MIS | ${pathName}`;
      document.title = pageTitle.toUpperCase();
    };
    //update the HTML title when the component mounts and the URL changes
    dynamicTitle();
    window.addEventListener("popstate", dynamicTitle);

    //clean up the event listener when the component unmounts
    return () => window.removeEventListener("popstate", dynamicTitle);
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
