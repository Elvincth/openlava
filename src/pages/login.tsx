import React from "react";

function Login() {
  const login = () => {};

  return (
    <div className="container  mt-8 lg:my-[4.5rem]">
      <h1 className="text-[35px] lg:text-4xl text-black font-bold">
        Connect your wallet.
      </h1>

      <h2 className="mt-3 ">
        Connect with one of our available wallet providers.
      </h2>
      <div
        role="button"
        className="p-[16px] flex items-center h-[58px] border rounded-lg my-5 hover:shadow-md transition-shadow"
      >
        <img
          width={24}
          height={24}
          src="https://res.cloudinary.com/dasq4goqg/image/upload/v1649428489/metamask-alternative_zh8kkr.webp"
          alt=""
        />
        <span className="ml-3 font-bold">MetaMask</span>
      </div>
    </div>
  );
}

export default Login;
