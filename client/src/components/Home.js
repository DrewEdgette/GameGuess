import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';

function Home() {

  const unique_id = utf8_to_b64(uuid());
  
  function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str))).slice(0,12);
  }
  
  return (
    <div>
      Home
      <br></br>
      {unique_id}
      <br></br>
      {unique_id.length}
      <br></br>
      <nav>
        <ul>
          <li>
            <Link to="all">All Locations</Link>
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
