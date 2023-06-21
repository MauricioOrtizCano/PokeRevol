import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <>
      <Route exact path="/">
        <LandingPage />
      </Route>
    </>
  );
}

export default App;
