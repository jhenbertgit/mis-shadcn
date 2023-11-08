import { Routes, Route } from "react-router-dom";
import ThreatGrpEvents from "./components/pages/ThreatGrpEvents";
import BdpBrgy from "./components/pages/BdpBrgy";
import Latlong from "./components/pages/Latlong";
import RpsbDeployment from "./components/pages/RpsbDeployment";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ThreatGrpEvents />} />
        <Route path="/bdp" element={<BdpBrgy />} />
        <Route path="/latlong" element={<Latlong />} />
        <Route path="rpsb" element={<RpsbDeployment />} />
      </Routes>
    </>
  );
}

export default App;
