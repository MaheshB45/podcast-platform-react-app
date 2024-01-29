/* eslint-disable react/prop-types */

// React router dom library
import { useNavigate } from "react-router-dom";

// React library
import { useReducer } from "react";

// React Toastify library
import { toast } from "react-toastify";

// Firebase library
import { storage, db, auth } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Imported from Common Component
import InputComponent from "../Input";
import FileInput from "../Input/FileInput";
import Button from "../Button";
import { addDoc, collection } from "firebase/firestore";

const EpisodeForm = ({ podcastId }) => {
  const Navigate = useNavigate();

  // Function to handel Submit
  function handelSubmit(e) {
    e.preventDefault();
    if (formState.loading) {
      return;
    }
    validateForm();
  }

  async function validateForm() {
    if (
      formState.episodeTitle === "" ||
      formState.episodeDescription === "" ||
      formState.episodeAudio === ""
    ) {
      toast.error("Please complete the form!");
    } else {
      try {
        formDispatch({ type: "LOADING", payLoad: true });
        // Audio Ref
        const AudioRef = ref(
          storage,
          `audios/${auth.currentUser.uid}/${Date.now()}`
        );
        // Uploading Audio
        await uploadBytes(AudioRef, formState.episodeAudio);
        // Downloading Audio
        const AudioURL = await getDownloadURL(AudioRef);

        const newEpisode = {
          title: formState.episodeTitle,
          description: formState.episodeDescription,
          audio: AudioURL,
        };

        await addDoc(
          collection(db, "podcasts", podcastId, "episodes"),
          newEpisode
        );

        toast.success("Episode uploaded!");
        formDispatch({ type: "LOADING", payLoad: false });
        formDispatch({ type: "SUCCESS" });
        Navigate(`/podcastDetails/${podcastId}`);
      } catch (error) {
        toast.error(error.message);
        formDispatch({ type: "LOADING", payLoad: false });
      }
    }
  }

  // useReducer
  const [formState, formDispatch] = useReducer(FormReducer, {
    episodeTitle: "",
    episodeDescription: "",
    episodeAudio: "",
    loading: false,
  });

  //   FormReducer
  function FormReducer(state, action) {
    if (action.type === "TITLE") {
      return { ...state, episodeTitle: action.payLoad };
    } else if (action.type === "DESCRIPTION") {
      return { ...state, episodeDescription: action.payLoad };
    } else if (action.type === "AUDIO") {
      return { ...state, episodeAudio: action.payLoad };
    } else if (action.type === "LOADING") {
      return { ...state, loading: action.payLoad };
    } else if (action.type === "SUCCESS") {
      return {
        ...state,
        episodeTitle: "",
        episodeDescription: "",
        episodeAudio: "",
      };
    }
    return state;
  }

  return (
    <div className="input-wrapper">
      <h1>Create An Episode</h1>
      <form onSubmit={handelSubmit}>
        <InputComponent
          type="text"
          onInput={(e) => {
            formDispatch({ type: "TITLE", payLoad: e.target.value });
          }}
          value={formState.episodeTitle}
          placeholder="Episode Title"
        ></InputComponent>
        <InputComponent
          type="text"
          onInput={(e) => {
            formDispatch({ type: "DESCRIPTION", payLoad: e.target.value });
          }}
          value={formState.episodeDescription}
          placeholder="Episode Description"
        ></InputComponent>
        <FileInput
          id={"Audio-file"}
          name={"Audio"}
          accept={"audio/*"}
          onFileSelected={(file) =>
            formDispatch({ type: "AUDIO", payLoad: file })
          }
        />
        {formState.loading ? (
          <Button className="Loading" text={"Loading..."}></Button>
        ) : (
          <Button type="submit" text={"Create Now"}></Button>
        )}
      </form>
    </div>
  );
};

export default EpisodeForm;
