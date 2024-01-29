/* eslint-disable jsx-a11y/img-redundant-alt */
// React library
import { useEffect, useState } from "react";

// Navbar component
import Header from "../components/Header";

// Button component
import Button from "../components/Button/index";

// Episode component
import EpisodeCard from "../components/EpisodeCard/EpisodeCard";

// Audio component
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";

// React router dom library
import { useParams, useNavigate } from "react-router-dom";

// firestore library
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";

// React toastify library
import { toast } from "react-toastify";

const PodcastDetails = () => {
  // Podcast Id
  const { id } = useParams();

  //   Navigate
  const Navigate = useNavigate();

  // useState to store podDetails
  const [podDetails, setPodDetails] = useState({});

  // useState to store episodes
  const [episodes, setEpisodes] = useState([]);

  // useState to store audio player details
  const [playSound, setplaySound] = useState("");

  // useEffect for getting the banner data on id change
  useEffect(() => {
    if (id) {
      getDetails();
    }
  }, [id, getDetails]);

  // useEffect for gettting episodes
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "podcasts", id, "episodes"),
      (snapshot) => {
        const arr = [];
        snapshot.forEach((doc) => {
          arr.push({ id: doc.id, isPlaying: false, ...doc.data() });
        });
        setEpisodes(arr);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [id]);

  // function to fetch the podcast details
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getDetails() {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPodDetails({ id: id, ...docSnap.data() });
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <>
      <Header />
      <div className="PodcastDetails">
        {podDetails.id ? (
          <div className="Pod-Details">
            <div className="Pod-title-button-holder">
              <p className="Pod-title">{podDetails.title}</p>
              {auth.currentUser.uid === podDetails.createdBy && (
                <Button
                  className={"Pod-create-episode-button"}
                  callback={() => {
                    Navigate(`/podcast/create-episode/${id}`);
                  }}
                  text={"Create Episode"}
                />
              )}
            </div>
            {/* Podcast details section */}
            <div className="Pod-banner">
              <img
                src={podDetails.bannerImage}
                alt="No-Image"
                title={podDetails.bannerImage}
              />
            </div>
            <p className="podcast-desc">{podDetails.description}</p>
            {/* Episode section */}
            <div className="Pod-episodes">
              <h2 className="Episode-heading">
                Episodes
              </h2>
              {episodes.length > 0 ? (
                episodes.map((val, index) => (
                  <EpisodeCard
                    key={val.id}
                    episode={val}
                    index={index}
                    setplaySound={setplaySound}
                    play={val.isPlaying}
                    episodes={episodes}
                    setEpisodes={setEpisodes}
                  />
                ))
              ) : (
                <h3 style={{ color: "white", alignSelf: "center" }}>
                  No episodes added
                </h3>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        {playSound !== "" ? (
          <AudioPlayer
            src={playSound.audio}
            image={podDetails.smallImage}
            name={playSound.title}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default PodcastDetails;
