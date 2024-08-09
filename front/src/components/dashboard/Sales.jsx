import React from "react";
import HeadTitle from "./HeadTitle";
import { Icons } from "../../assets/icons";
import { SALES_LISTS } from "../../constants/menuLists";

const Sales = () => {
  return (
    <div className="w-[50%] px-[5px]">
      <div className="block-cell">
        <div className="header-wrapper flex justify-between">
          <HeadTitle title="Today's Sales" />
          <div className="export_button">
            <button
              className="flex items-center gap-x-[6px] h-8 border border-solid border-gray-500 rounded-md
            py-[2px] px-2 font-semibold"
            >
              <img
                src={Icons.ExportDark}
                alt=""
                className="invert-[1] brightness-[100%]"
              />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="cards flex gap-4 mt-6">
          {SALES_LISTS.map((item, idx) => (
            <div
              className="card_item border border-gray-500 py-4 px-[18px] rounded-md"
              key={idx}
            >
              <div className="card_icon w-12 h-12 flex items-center justify-center border border-gray-500 rounded-full">
                <img src={item.src} alt="" className="w-6" />
              </div>
              <div className="card_value font-bold text-xl mt-3 mb-1">
                {item.value}
              </div>
              <p className="card_title font-semibold mb-3">{item.title}</p>
              <span className="card_text text-sm font-normal">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sales;
