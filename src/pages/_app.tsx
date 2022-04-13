import "../styles/globals.css";
import "../styles/tailwind.css";

import NavBar from "~/components/NavBar";

import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // The user changed his/her account
    const handleAccountChangeEvt = (address: string) => {
      console.log("handleAccountChangeEvt reload now");

      if (localStorage.getItem("address")) { 
        localStorage.setItem("address", ""); // store the new address

        window.dispatchEvent(new Event("storage"));
      }

      router.push("/connect");
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChangeEvt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
