import React from "react";
import Eth from "~/components/svg/Eth";

const detail = () => {
  return (
    <section className="flex flex-col w-full h-screen">
      <div className="flex flex-row justify-center w-full h-screen pt-10">
        <div className="flex flex-col max-w-[700px]">
          <div className="border border-gray-100 rounded-2xl">
            <div className="w-full p-4">
              <Eth />
            </div>
            <img
              className="rounded-b-2xl"
              src="https://static.boredpanda.com/blog/wp-content/uploads/2020/05/Illustrators-create-artwork-in-aid-of-health-workers-5eb48aea538d2__880.jpg"
            />
          </div>
        </div>
        <div className="flex flex-col pl-6">
          <h1 className="pt-12 text-3xl font-semibold">Name</h1>
          <div className="flex flex-row pt-10">
            <div>
              owned by <span className="text-orange-500">owner</span>
            </div>
          </div>
          <div className="w-full p-8 pb-12 border-2 bg-gray-50 pr-80 rounded-2xl">
            <h1 className="pb-2 text-xl font-normal ">Price</h1>
            <div className="flex flex-row items-center">
              <div className="pb-1">
                <Eth />
              </div>
              <h1 className="px-2 text-4xl font-semibold">0.5</h1>
              <h1 className="text-xl font-normal">($1,646.45)</h1>
            </div>

            <a
              href="#_"
              className="relative px-40 py-5 overflow-hidden text-white transition-all duration-300 ease-out bg-orange-500 rounded-2xl group hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 hover:ring-2 hover:ring-offset-2 hover:ring-orange-400"
            >
              <button className="pt-8">
                <span className="relative text-xl">Make offer</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default detail;
