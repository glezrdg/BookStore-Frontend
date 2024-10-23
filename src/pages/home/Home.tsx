import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-4xl">
      <span>home</span>
      <Link to="/login">IR A LOGIN</Link>
    </div>
  );
}

export default Home;
