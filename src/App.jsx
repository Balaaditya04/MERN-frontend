import { ssrImportMetaKey } from "vite/module-runner";
import "./App.css";
import Home from "./components/Home";
import Register from "./components/Register";

function App() {
  return (
    // <div className="App-Container">
      // <h1 style={{ backgroundColor: "orange" }}>MERN Frontend</h1>
    //   {/* <Home /> */}
      <Register/>
    //   <h3>This is footer</h3>
    // </div>
  );
}

export default App;
