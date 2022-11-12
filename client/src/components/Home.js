import React from "react";
import { Link } from "react-router-dom";

function Home() {

  return (
    <div>
      Home
      <nav>
        <ul>
          <li>
            <Link to="all">All Locations</Link>
          </li>

          <li>
            <Link to="create">Create Challenge</Link>
          </li>

          <li>
            <Link to="challenge/random">Random Challenge</Link>
          </li>

          <li>
            <Link to="challenge/MTc2MDVmYzQt">uuid test Challenge</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
