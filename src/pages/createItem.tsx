import React from "react";
import Header from "~/components/Header";

const createItem = () => {
  return (
    <div>
      <Header />
      {/* top */}
      <div className="mx-[10rem] my-[5rem]">
        <div className="text-[60px] text-black font-bold">Create Item</div>
        <div className="text-[18px] text-[#727A81] mt-[49px]">
          <span className="text-[#F93A3A]">* </span>Requested fields
        </div>
        <div className="text-[30px] text-black mt-[16px] font-bold">
          Image, Video, Audio or 3D Model
          <span className="text-[#F93A3A]"> *</span>
        </div>
        <div className="text-[18px] text-[#727A81] mt-[17px]">
          File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
          GLB, GLTF. Max size:100 MB
        </div>
        {/* field */}
        <div>
          <div className="text-[28px] text-black font-bold">
            Name <span className="text-[#F93A3A]"> *</span>
          </div>

          <input></input>
        </div>
      </div>
    </div>
  );
};

export default createItem;
