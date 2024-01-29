/* eslint-disable jsx-a11y/alt-text */
// Podcast-Card CSS
import "./PodcastCard.css";

// React router dom
import { Link } from "react-router-dom";

const PodcastCard = ({ image, title, id }) => {
  return (
    <Link to={`/PodcastDetails/${id}`}>
      <div className="podcast-card">
        <img className="display-img-podcast" src={image} />
        <p className="title-podcast">{title}</p>
      </div>
    </Link>
  );
};

export default PodcastCard;
