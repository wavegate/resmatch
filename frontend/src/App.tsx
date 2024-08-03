import { useEffect } from "react";
import "./App.css";

const localBackend = "http://localhost:3000/";
const prodBackend = "https://powerful-falls-38746-ef92b126204d.herokuapp.com/";

function App() {
  useEffect(() => {
    fetch(prodBackend + "first-user")
      .then((res) => res.json())
      .then(console.log);
  }, []);
  return <>Hi</>;
}

export default App;
