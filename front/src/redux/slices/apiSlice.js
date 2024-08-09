import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; //툴킷 import
import {
  GET_REVENUE_API_URL,
  GET_SALES_MAP_API_URL,
  GET_VISITORS_API_URL,
  GET_VOLUME_SERVICES_API_URL,
} from "../../constants/apiUrl"; // API URL import
import { getRequest } from "../../constants/requestMethods"; // API 메서드 import
import { act } from "react";

// 공통된 비동기 액션 생성 로직을 별도의 함수로 분리
const createFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async () => {
    return await getRequest(apiURL);
  });
};

export const fetchRevenueData = createFetchThunk(
  "fetchRevenue",
  GET_REVENUE_API_URL
);

export const fetchVisitorsData = createFetchThunk(
  "fetchVisitors",
  GET_VISITORS_API_URL
);

export const fetchMapsData = createFetchThunk(
  "fetchMaps",
  GET_SALES_MAP_API_URL
);

export const fetchVolumeData = createFetchThunk(
  "fetchVolume",
  GET_VOLUME_SERVICES_API_URL
);

const handleFullfilled = (stateKey) => (state, action) => {
  // Add user to the state array (성공했을 때)
  state[stateKey] = action.payload;
};

const handleRejected = (state, action) => {
  console.log(action.payload);
  state.isError = true;
};

const apiSlice = createSlice({
  name: "api",
  initialState: {
    revenueData: null,
    visitorsData: null,
    mapsData: null,
    volumeData: null,
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchRevenueData.fulfilled, handleFullfilled("revenueData"))
      .addCase(fetchRevenueData.rejected, handleRejected)
      .addCase(fetchVisitorsData.fulfilled, handleFullfilled("visitorsData"))
      .addCase(fetchVisitorsData.rejected, handleRejected)
      .addCase(fetchMapsData.fulfilled, handleFullfilled("mapsData"))
      .addCase(fetchMapsData.rejected, handleRejected)
      .addCase(fetchVolumeData.fulfilled, handleFullfilled("volumeData"))
      .addCase(fetchVolumeData.rejected, handleRejected);
  },
});

export default apiSlice.reducer;
