/* eslint-disable jsx-a11y/alt-text */
// Podcast-Card CSS
import "./PodcastCard.css";

// React router dom
import { Link } from "react-router-dom";

const PodcastCard = ({ image, title , id }) => {

  
  return (
    <Link to={`/PodcastDetails/${id}`}>
     <div className="PodcastCard">
      <div className="PodcastCard-content">
        <img className="PodcastCard-bannerImage" src={image} loading="lazy"/>
        <p className="PodcastCard-title">{title}</p>
      </div>
    </div>
    </Link>
   
  );
};

export default PodcastCard;