import "../styles/globals.css";
import "../styles/tailwind.css";

import NavBar from "~/components/NavBar";

import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    //The user changed his/her account
    const handleAccountChangeEvt = (address: string) => {
      localStorage.setItem("address", address); //Store the new address

      window.dispatchEvent(new Event("storage"));

      router.reload();
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChangeEvt);
    }
  }, []);

  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
