/* eslint-disable react/prop-types */
import "./EpisodeCard.css";

import Button from "../Button";

import { FaPlay,FaPause } from "react-icons/fa";


const EpisodeCard = ({ episode, index, setplaySound, play,episodes,setEpisodes }) => {


  // Function to handle play  episode
  function handlePlay() {
    const newArr = [...episodes];
    
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].id === episode.id) {
          newArr[i].isPlaying = false;
      }
    }
    setEpisodes(newArr);
 
  }

  // Function to handle pause episode
  function handlePause() {
    const newArr = [...episodes];
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].id === episode.id) {
        
          newArr[i].isPlaying = true;        
      }
      else{
        newArr[i].isPlaying = false
      }
    }
    setEpisodes(newArr);
  }

  return (
    <>
      <div className="Pod-episode">
      <h1 style={{textAlign: "left", marginBottom: 0}}>{`${index + 1}.) ${episode.title}`}</h1>
        <p style={{marginLeft: "1.5rem"}} className="Pod-episode-description">{episode.description}</p>
        {play ? (
          <Button
            className={"Pod-episode-play-button"}
            text={<FaPause/>}
            callback={() => {
              handlePlay();
              setplaySound("");
            }}
          />
        ) : (
          <Button
            className={"Pod-episode-play-button"}
            text={<FaPlay/>}
            callback={() => {
              handlePause();
              setplaySound(episode);
            }}
          />
        )}
      </div>
    </>
  );
};

export default EpisodeCard;