import { useState } from "react";
import { TEST_GIFS } from "../utils/testGifs";

export const GifsContainer = () => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (e) => {
    const { value } = e.target;

    setInputValue(value);
  };

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log("GIF link: ", inputValue);
    } else {
      console.log("No GIF link provided. !!! EMPTY LINK !!!");
    }
  };

  return (
    <div className="connected-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendGif();
        }}
      >
        <input
          type="text"
          placeholder="Enter Gif Link"
          value={inputValue}
          onChange={onInputChange}
        />
        <button type="submit" className="cta-button submit-gif-button">
          Submit
        </button>
      </form>
      <div className="gif-grid">
        {TEST_GIFS.map((gif) => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );
};
