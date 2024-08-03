import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("https://powerful-falls-38746-ef92b126204d.herokuapp.com/")
      .then((res) => res.json())
      .then(console.log);
  }, []);
  return <>Hi</>;
}

export default App;
