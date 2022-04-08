import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Logout = () => {
  let router = useRouter();

  useEffect(() => {
    localStorage.removeItem("address");
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  });

  return <></>;
};

export default Logout;
