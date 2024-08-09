import React, { useEffect } from "react";
import HeadTitle from "./HeadTitle";

import { useDispatch, useSelector } from "react-redux"; //데이터 가져다 쓰기 useSelector 업데이트 해주기 useDispatch
import { fetchMapsData } from "../../redux/slices/apiSlice";

import { ComposableMap, Geographies, Geography } from "react-simple-maps"; //react simple map 임포트
import geoUrl from "../../constants/world-50m.v1.json"; // geoUrl이란 이름으로 가져오기
import { COLOR_MAP } from "../../constants/menuLists";

const getFillColor = (fillCode) => COLOR_MAP[fillCode] || "#ececec";

const SalesMap = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.api.mapsData);

  useEffect(() => {
    dispatch(fetchMapsData());
  }, [dispatch]);

  // console.log(state);

  const findCountryId = (countryId) => {
    const matchedCountry = state?.find(
      (country) => country.country_id === countryId
    ); // Geography 컴포넌트는 map으로부터 가져오므로 객체 타입이다. filter는 배열을 반환하므로 사용할 수 없고, find를 사용해야 한다.
    // console.log(matchedCountry);
    return matchedCountry ? getFillColor(matchedCountry.fill_color) : "#ececec";
  };

  return (
    <div className="w-[30%] px-[5px] py-[10px]">
      <div className="block-cell">
        <div className="head_wrapper">
          <HeadTitle title="Sales Mapping By Country" />
        </div>

        <div className="map_chart">
          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{
              rotate: [0, 0, 0],
              scale: 200,
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={findCountryId(geo.id)}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
};

export default SalesMap;
