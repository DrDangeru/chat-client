import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Join from './Component/Join';
import Chat from './Component/Chat';

const App = () => {
  return (
    <>
      {/* <div>Welcome to Chat</div> */}
      <Router>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
