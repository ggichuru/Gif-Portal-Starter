import { useEffect, useState } from "react";
import twitterLogo from "../assets/twitter-logo.svg";
import { checkIfWalletConnected } from "../utils/checkIfWalletConnected";
// import { connectWallet } from "../utils/connectWallet";

// Constants
const TWITTER_HANDLE = "_ggichuru";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

export const Home = () => {
  /** STATE */
  const [walletAddress, setWalletAddress] = useState(null);

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

  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">🖼 GIF NYUMBANI</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress ? walletConnectButton() : walletDiconnectButton()}
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
