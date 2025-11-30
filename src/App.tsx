import "./App.css";
import Home from "./pages/Home/Home";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <div className="app">
      <Navigation currentPath="/" />
      <Home />
    </div>
  );
}

export default App;
