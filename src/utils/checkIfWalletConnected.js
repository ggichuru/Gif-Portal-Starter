export const checkIfWalletConnected = async () => {
  try {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        console.log("Phantom Wallet detected");
        return provider;
      } else {
        alert("solana Object Not Found, get a phantom Wallet");
      }
      //   window.open("https://phantom.app/", "_blank");

      //   provider.on("connect", (publicKey) => {
      //     console.log(publicKey);
      //   });

      //   return provider;
    }
  } catch (error) {
    console.error(error);
  }
};
