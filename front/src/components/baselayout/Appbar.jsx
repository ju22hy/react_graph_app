import React from "react";
import { Icons } from "../../assets/icons";
import Languages from "./Languages";

const Appbar = () => {
  return (
    <div className="px-[5px]">
      <div className="shadow-[0_0_0.25rem_rgba(255,255,255,0.3)] py-3 px-6 rounded-sm bg-gray-950 text-white w-full">
        <div className="appbar_contents flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Dashboard</h3>
          </div>
          <div className="flex items-center">
            <div className="search_bar">
              <form action="">
                <div className="input_group bg-gray-700 rounded-xl h-11 py-1 px-3 flex items-center gap-x-3 min-w-80">
                  <span>
                    <img
                      src={Icons.SearchBlue}
                      alt=""
                      className="w-5 flex place-items-center"
                    />
                  </span>
                  <input
                    type="text"
                    placeholder="검색어를 입력해주세요."
                    className="border-none outline-0 text-white placeholder-neutral-400 bg-gray-700 text-sm"
                  />
                </div>
              </form>
            </div>

            <Languages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
