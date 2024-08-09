import React from "react";

const HeadTitle = (props) => {
  return (
    <div className="mt-[2px]">
      <h2 className="text-xl font-bold">{props.title}</h2>
    </div>
  );
};

export default HeadTitle;
