import React from "react";

export default function LoadingOverlay({ message }: { message: string }) {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-gray-700 opacity-75">
      <div className="loader"></div>
      <h2 className="text-xl font-semibold text-center text-white">
        Creating...
      </h2>
      <p className="w-1/3 text-center text-white">{message}</p>
    </div>
  );
}
