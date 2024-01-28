import React, { useState } from "react";
import "./style.css";

const FileInput = ({ id, accept, name, onFileSelected, text }) => {
  const [fileSelected, setFileSelected] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelected(e.target.files[0]);
      setFileSelected(true);
    }
  };

  return (
    <>
      <input
        type="file"
        accept={accept}
        id={id}
        name={name}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label htmlFor={id} className="custom-input-file-button">
        {!fileSelected ? text ?? "Upload File" : "File Selected"}
      </label>
    </>
  );
};

export default FileInput;