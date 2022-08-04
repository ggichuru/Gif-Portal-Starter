import twitterLogo from "../assets/twitter-logo.svg";

// Constants
const TWITTER_HANDLE = "_ggichuru";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

export const Home = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 GIF NYUMBANI</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
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
