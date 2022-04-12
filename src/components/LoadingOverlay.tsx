import React from "react";

export default function LoadingOverlay({
  title,
  message,
  successful,
}: {
  title: string;
  message: string;
  successful?: boolean;
}) {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-gray-700 opacity-75">
      {successful ? (
        <svg
          className="mb-4 checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      ) : (
        <div className="loader" />
      )}

      <h2 className="text-xl font-semibold text-center text-white">{title}</h2>
      <p className="w-1/3 text-center text-white">{message}</p>
    </div>
  );
}
