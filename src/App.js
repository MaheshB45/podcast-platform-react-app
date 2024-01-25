import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <div className="App">
    <ToastContainer />
    <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          {/* <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/create-podcast" element={<CreatePodcast />} />
            <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
            <Route
              path="/podcast/:podcastId/create-episode"
              element={<CreateEpisode />}
            />
          </Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
