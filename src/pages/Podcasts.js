// React library
import { useEffect } from "react";
// Navbar component
import Header from "../components/Header/index";
// input component
import InputComponent from "../components/Input/index";
// Firebase library component
import { onSnapshot, collection } from "firebase/firestore";
// imported firebase file
import { db } from "../firebase";
// Redux slice
import { setPodcasts, setFilterPodcasts } from "../slices/podcastSlice";

// React redux
import { useDispatch, useSelector } from "react-redux";
// Podcast Card
import PodcastCard from "../components/PodcastCard/PodcastCard";

const Podcasts = () => {
  // dispatch
  const dispatch = useDispatch();
  // podcasts Array
  const { podcasts, filterPodcasts } = useSelector((state) => state.podcasts);

  // Getting the list of podcasts that are currently available
  useEffect(() => {
    // Resetting the filter podcasts array
    dispatch(setFilterPodcasts([]));

    // Adding podcast to podcastSlice
    const unsubscribe = onSnapshot(collection(db, "podcasts"), (snapshot) => {
      const podcasts = [];
      snapshot.forEach((doc) => {
        podcasts.push({ id: doc.id, details: doc.data() });
      });
      dispatch(setPodcasts(podcasts));
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  //   Function to search for podcast
  function handelSearch(e) {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm === "") {
      dispatch(setFilterPodcasts([]));
      return;
    }
    // Filtering out the podcast
    const newArray = podcasts.filter((val) => {
      const titleSubstring = val.details.title
        .toLowerCase()
        .substring(0, searchTerm.length);
      console.log("Title Substring:", titleSubstring);
      console.log("Search Term:", searchTerm);
      return titleSubstring === searchTerm;
    });

    dispatch(setFilterPodcasts(newArray));
  }

  // console.log(podcasts);
  return (
    <>
      <Header />
      <div className="input-wrapper">
        <h1>Discover Podcasts</h1>

        <InputComponent
          type="text"
          placeholder={"Search for a title"}
          className={"Podcasts-search"}
          onInput={handelSearch}
        />
        <div className="Podcasts-cards">
          {podcasts.length > 0 ? (
            ""
          ) : (
            <h1 style={{ color: "white" }} className="Podcasts-not-avail">
              No podcast available
            </h1>
          )}
          {filterPodcasts.length > 0
            ? filterPodcasts.map((val) => (
                <PodcastCard
                  key={val.id}
                  id={val.id}
                  image={val.details.smallImage}
                  title={val.details.title}
                />
              ))
            : podcasts.length > 0 &&
              podcasts.map((val) => (
                <PodcastCard
                  key={val.id}
                  id={val.id}
                  image={val.details.smallImage}
                  title={val.details.title}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default Podcasts;
