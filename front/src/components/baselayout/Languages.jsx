import React, { useEffect, useState } from "react";
import axios from "axios";
import { REST_COUNTRIES_API_URL } from "../../constants/apiUrl";
import { Icons } from "../../assets/icons";

const Languages = () => {
  const DEFAULT_COUNTRY = "South Korea"; // 리덕트에서 가져온 디스패치
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isDropOpen, setIsDropOpen] = useState(false);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(REST_COUNTRIES_API_URL);

        const sortedCountries = response.data.sort((a, b) => {
          // a, b 인자는 어디에 무슨 값을 받고 있는가? 받는 거 아님 그냥 인자 a, b를 받겠다고 지정해준 것
          return (
            a[0] === b[0] && // 각 객체의 1번째 요소가 같은가
            a.name.common.localeCompare(b.name.common)
          ); // 그럼 전체 단어 오름차순 지금은 오름차순 안 되는 게 맞음
          // : a.name.common.localeCompare(b.name.common); // 아니면 1번째 알파벳 오름차순
        });

        // console.log(response.data);
        setCountries(sortedCountries);

        const defaultCountry = sortedCountries.find(
          (country) => country.name.common == DEFAULT_COUNTRY
        );

        // Object.keys() 메서드는 객체(typeof 연산자로 확인했을 때 object가 반환되는)의 프로퍼티들 중에서 key값, 다른 말로 프로퍼티 네임들만 묶어서 배열로 반환하는 메서드이다.
        if (defaultCountry) {
          const langKey = Object.keys(defaultCountry.languages)[0];
          //Object 객체에 keys 메서드를 호출하고 파라미터로 Key값을 알아내고자 하는 객체를 전달
          setSelectedCountry({
            country: defaultCountry.name.common,
            flag: defaultCountry.flags.png,
            language: langKey,
          });
        }
      } catch (error) {
        console.log("Error Fetching Country Data", error);
      }
    };

    fetchCountryData();
  }, []);

  const handleDropList = () => setIsDropOpen(!isDropOpen);

  // 자바스크립트 객체에서 키와 값이 같을 경우 키 혹은 값 중 하나만 쓸 수 있다
  // handleSelected (country.name.common, country.flags.png, langKey);
  const handleSelected = (country, flag, language) => {
    setSelectedCountry({ country, flag, language });
  };

  return (
    //w-[100px]
    <div className="w-30 h-10 mx-7 relative" onClick={handleDropList}>
      <div className="dropdown_default w-full h-full cursor-pointer px-1 py-3 flex items-center gap-x-3">
        <div className="dropdown_img w-6 h-6 overflow-hidden rounded-full">
          <img
            src={selectedCountry?.flag} // option changing: 물음표를 사용하여 만약 데이터가 없더라도 에러를 발생시키지 않는다.
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="dropdown_text flex items-center gap-x-2">
          <span>{selectedCountry?.language}</span>
          <img
            src={Icons.ChevronDownDark}
            alt=""
            className="invert-[1] brightness-[100%]"
          />
        </div>
      </div>

      <div
        className={`dropdown_all absolute top-full w-full let-0 py-2 px-0 bg-gray-900 shadow-[0_0.125rem_0.25rem_rgba(255,255,255,0.3)] rounded-sm
        ${isDropOpen ? "" : "hidden"}
        `}
      >
        <div className="drop_lists_wrapper max-h-52 py-[6px] px-3 overflow-y-scroll">
          {countries.map((country, idx) => {
            if (country.languages && Object.keys(country.languages)) {
              const langKey = Object.keys(country.languages)[0];
              return (
                <div
                  key={idx}
                  className="flex items-center gap-x-3 cursor-pointer hover:bg-gray-700 py-1 px-2"
                  onClick={() =>
                    handleSelected(
                      country.name.common,
                      country.flags.png,
                      langKey
                    )
                  }
                >
                  <span className="w-4 h-4 overflow-hidden rounded-full">
                    <img
                      src={country.flags.png}
                      alt=""
                      className="w-full h-full object-cover block"
                    />
                  </span>
                  <span>{langKey}</span>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Languages;
