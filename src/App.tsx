import { Routes, Route } from "react-router";
import StartScreen from "./components/Start Screen/StartScreen";
import Categories from "./components/Categories/Categories";
import Category from "./components/Category/Category";
import Stats from "./components/Stats/Stats";

//Quiz API: https://opentdb.com/api_config.php

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:name" element={<Category />} />
        <Route path="/player-stats" element={<Stats />} />
      </Routes>
    </>
  );
}

export default App;
