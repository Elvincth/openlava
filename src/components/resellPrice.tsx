import React from "react";

const ResellPrice = (props: {
  handleClose: React.MouseEventHandler<HTMLSpanElement> | undefined;
  content: React.ReactChild;
}) => {
  return (
    <form className="flex items-center justify-center popup-box">
      <div className="box-animate bg-white max-w-[500px] rounded-lg">
        <div
          role="button"
          onClick={props.handleClose}
          className="flex justify-end mt-2 mb-1 mr-3"
        >
          <svg
            data-v-441ca6f3
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="28px"
            height="28px"
            viewBox="0 0 40 40"
            version="1.1"
          >
            <g data-v-441ca6f3 id="surface1">
              <path
                data-v-441ca6f3
                d="M 40 20 C 40 31.046875 31.046875 40 20 40 C 8.953125 40 0 31.046875 0 20 C 0 8.953125 8.953125 0 20 0 C 31.046875 0 40 8.953125 40 20 Z M 40 20 "
                style={{
                  stroke: "none",
                  fillRule: "evenodd",
                  fill: "#E0E0E0",
                  fillOpacity: 1,
                }}
              />{" "}
              <path
                data-v-441ca6f3
                d="M 24.367188 13.453125 C 24.96875 12.847656 25.945312 12.847656 26.546875 13.453125 C 27.152344 14.054688 27.152344 15.03125 26.546875 15.632812 L 22.183594 20 L 26.546875 24.367188 C 27.152344 24.96875 27.152344 25.945312 26.546875 26.546875 C 25.945312 27.152344 24.96875 27.152344 24.367188 26.546875 L 20 22.183594 L 15.632812 26.546875 C 15.070312 27.113281 14.175781 27.148438 13.570312 26.652344 L 13.453125 26.546875 C 12.847656 25.945312 12.847656 24.96875 13.453125 24.367188 L 17.816406 20 L 13.453125 15.632812 C 12.847656 15.03125 12.847656 14.054688 13.453125 13.453125 C 14.054688 12.847656 15.03125 12.847656 15.632812 13.453125 L 20 17.816406 Z M 24.367188 13.453125 "
                style={{
                  stroke: "none",
                  fillRule: "evenodd",
                  fill: "rgb(131, 131, 137)",
                  fillOpacity: 1,
                }}
              />
            </g>
          </svg>
        </div>
        {props.content}
      </div>
    </form>
  );
};

export default ResellPrice;
