import Router from "./config/router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App bg-slate-500">
      <Router />
      <Toaster />
    </div>
  );
}

export default App;
