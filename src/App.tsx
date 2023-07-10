import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ImageSearchContainer from "./containers/ImageSearchContainer";
import ImageDetailsContainer from "./containers/ImageDetailsContainer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ImageSearchContainer />} />
        <Route path="/search" element={<ImageSearchContainer />} />
        <Route path="/results/:id" element={<ImageDetailsContainer />} />
        <Route
          path="/results/:id/:q/:page"
          element={<ImageDetailsContainer />}
        />
      </Routes>
    </Router>
  );
}

export default App;
