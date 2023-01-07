import "../css/index.css";
import Challenge from "./Challenge";
import Home from "./Home";
import Skyrim from "./Skyrim";
import All from "./All";
import Create from "./Create";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import Account from "./Account";
import MyChallenges from "./MyChallenges";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/skyrim">
            <Route path="" element={<Skyrim></Skyrim>}/>
            <Route path="challenge/:id" element={<Challenge></Challenge>} />
            <Route path="all" element={<All></All>} />
            <Route path="create" element={<Create></Create>} />
   
        </Route>
        <Route path="account" element={<Account></Account>} />
        <Route path="mychallenges" element={<MyChallenges></MyChallenges>} />
        <Route path="signup" element={<SignUpPage></SignUpPage>} />
        <Route path="login" element={<LoginPage></LoginPage>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
