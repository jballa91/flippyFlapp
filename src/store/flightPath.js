import { api } from "../config";

const GET_FLIGHT_PATH = "GET_FLIGHT_PATH";
const SET_START_POINT = "SET_START_POINT";
const SET_END_POINT = "SET_END_POINT";
const RESET_START_END = "RESET_START_END";

const getFlightPath = (value) => ({ type: GET_FLIGHT_PATH, value });

const setStartPoint = (value) => ({ type: SET_START_POINT, value });

const setEndPoint = (value) => ({ type: SET_END_POINT, value });

const resetStartEnd = () => ({ type: RESET_START_END });

const updateFLightPath = (optDistance, optLandings, user, token) => {
  return async (dispatch, getState) => {
    const opt = optDistance ? true : false;
    const startPoint = getState().flightPath.startPoint;
    const endPoint = getState().flightPath.endPoint;
    const airplane = getState().airplanes.selectedAirplane;
    console.log(airplane);
    const data = {
      airplane,
      startPoint,
      endPoint,
      opt,
    };

    //some fetch request for the future
    const flightPathData = await fetch(`${api}/flightplans/pathcalc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    let result = await flightPathData.json();
    console.log(result);
    // const flightNums = Object.keys(result);
    // const flightPath = flightNums.map((key) => {
    //   return { lat: parseFloat(key.lat), lon: parseFloat(key.lng) };
    // });
    // console.log(flightNums);

    dispatch(getFlightPath(result.route));
  };
};

export const actions = {
  setStartPoint,
  setEndPoint,
  resetStartEnd,
};

export const thunks = {
  updateFLightPath,
};

const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FLIGHT_PATH: {
      return {
        ...state,
        flightPath: action.value,
      };
    }
    case SET_START_POINT: {
      return {
        ...state,
        startPoint: action.value,
      };
    }
    case SET_END_POINT: {
      return {
        ...state,
        endPoint: action.value,
      };
    }
    case RESET_START_END: {
      return {
        ...state,
        endPoint: {},
        startPoint: {},
        flightPath: {},
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
