import Header from "../components/Header";
import PodcastForm from "../components/PodcastForm/PodcastForm";

const StartAPodcast = () => {
  return (
    <>
      <Header />
      <div className="input-wrapper">
        <PodcastForm />
      </div>
    </>
  );
};

export default StartAPodcast;
