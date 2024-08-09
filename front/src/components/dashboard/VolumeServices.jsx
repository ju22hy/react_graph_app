import React, { useEffect } from "react";
import HeadTitle from "./HeadTitle";

import { useDispatch, useSelector } from "react-redux";
import { fetchVolumeData } from "../../redux/slices/apiSlice";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const VolumeServices = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.api.volumeData);

  useEffect(() => {
    dispatch(fetchVolumeData());
  }, [dispatch]);

  console.log(state);

  return (
    <div className="w-[30%] px-[5px] py-[10px]">
      <div className="block-cell">
        <div className="head_wrapper">
          <HeadTitle title="Volume vs Services Level" />
        </div>

        <div className="stacked_bar w-full h-[280px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={state}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 0"
                horizontal={false}
                vertical={false}
              />
              {/* <XAxis dataKey="name" /> */}
              {/* <YAxis /> */}
              <Tooltip cursor={{ fill: "transparent" }} />
              {/* Legend: 무슨색이 어떤 데이터를 나타내는지 알려주는 지표 */}
              <Legend
                iconType="circle"
                // verticalAlign="top"
                // align="right"
                // height={50}
                // position="top-right"
                wrapperStyle={{
                  fontSize: "18px",
                }}
              />
              <Bar dataKey="volume" stackId="a" fill="#0095ff" barSize={18} />
              <Bar
                dataKey="services"
                stackId="a"
                fill="#00e096"
                barSize={18}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default VolumeServices;
