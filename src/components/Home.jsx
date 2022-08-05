import { useEffect, useState } from "react";
import twitterLogo from "../assets/twitter-logo.svg";
import { checkIfWalletConnected } from "../utils/checkIfWalletConnected";
import { TEST_GIFS } from "../utils/testGifs";
// import { GifsContainer } from "./Gifs";
// import { connectWallet } from "../utils/connectWallet";

// Constants
const TWITTER_HANDLE = "_ggichuru";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

export const Home = () => {
  /** STATE */
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [gifList, setGifList] = useState([]);

  const connectWallet = async () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        const resp = await provider.connect();

        const pubkey = resp.publicKey.toString();
        console.log(pubkey);

        /*
         * @dev set the user public key to the state
         */
        setWalletAddress(pubkey);
      } else {
        window.open("https://phantom.app/", "_blank");
      }
    }
  };

  const disconnectWallet = async () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        await provider.disconnect();

        /*
         * @dev set the user public key to the state
         */
        setWalletAddress(null);
      }
    }
  };

  const walletConnectButton = () => {
    return (
      <button
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
      >
        Connect Wallet
      </button>
    );
  };

  const walletDiconnectButton = () => {
    return (
      <button
        className="cta-button connect-wallet-button"
        onClick={disconnectWallet}
      >
        Disconnect Wallet
      </button>
    );
  };

  const GifsContainer = () => {
    const onInputChange = (e) => {
      const { value } = e.target;

      setInputValue(value);
    };

    const sendGif = async () => {
      if (inputValue.length > 0) {
        console.log("GIF link: ", inputValue);
        setGifList([...gifList, inputValue]);
        setInputValue("");
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
          {gifList.map((gif) => (
            <div className="gif-item" key={gif}>
              <img src={gif} alt={gif} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  /**
   * @dev When the home component first mounts, let check i a phantom wallet is connected.
   */

  useEffect(() => {
    const onload = async () => {
      await checkIfWalletConnected();
    };

    window.addEventListener("load", onload);

    return () => window.removeEventListener("load", onload);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log("FETCHING GIFS");

      //TODO: [WAK-1] Call Solana program here

      //set state
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);
  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">🖼 ASTA NYUMBANI</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {/* TODO: [WAK-2] Add disconnect wallet */}
          {!walletAddress ? walletConnectButton() : GifsContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};
