import React from "react";

const createItem = () => {
  return (
    <div>
      {/* top */}
      <div className="mx-[20px] my-[50px] lg:mx-[10rem] lg:my-[5rem]">
        <div className="text-[35px] lg:text-[60px] text-black font-bold">
          Create Item
        </div>
        <div className="mt-[30px] text-[14px] lg:text-[18px] text-[#727A81] lg:mt-[49px]">
          <span className="text-[#F93A3A]">* </span>Requested fields
        </div>
        <div className="mt-[30px] text-[18px] lg:text-[30px] text-black lg:mt-[16px] font-bold">
          Image, Video, Audio or 3D Model
          <span className="text-[#F93A3A]"> *</span>
        </div>
        <div className="text-[14px] mt-[30px] lg:text-[18px] text-[#727A81] lg:mt-[17px]">
          File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
          GLB, GLTF. Max size: 100 MB
        </div>

        {/* image upload */}
        <div className="my-[50px]">
          <div className="">
            <div className="">
              <div className="w-full">
                <label className="flex flex-col h-[300px] lg:w-[600px] lg:h-[475px] border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="m-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[116px] h-[116px] text-gray-400 group-hover:text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Select a image
                    </p>
                  </div>
                  <input type="file" className="opacity-0" />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* field */}
        <div>
          <div className="text-[18px] lg:text-[28px] text-black font-bold">
            Name <span className="text-[#F93A3A]"> *</span>
          </div>
          <input
            type="text"
            placeholder="Item name"
            className="mt-[22px] w-full lg:h-[50px] bg-transparent outline-none rounded-[9px] py-2 pl-5 ring-1 ring-[#EDEFF1] shadow-sm lg:text-[23px]"
          />
        </div>

        <div className="mt-[60px]">
          <div className="text-[18px] lg:text-[28px] text-black font-bold">
            External link
          </div>
          <input
            type="text"
            placeholder="Item external link"
            className="mt-[22px] w-full lg:h-[50px] bg-transparent outline-none rounded-[9px] py-2 pl-5 ring-1 ring-[#EDEFF1] shadow-sm lg:text-[23px]"
          />
        </div>

        <div className="mt-[60px]">
          <div className="text-[18px] lg:text-[28px] text-black font-bold">
            Description
          </div>
          <textarea
            placeholder="Item description"
            className="mt-[22px] w-full h-[300px] bg-transparent outline-none rounded-[9px] py-2 pl-5 ring-1 ring-[#EDEFF1] shadow-sm lg:text-[23px] overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default createItem;
