import { api } from "../config";

const GET_FLIGHT_PATH = "GET_FLIGHT_PATH";
const SET_START_POINT = "SET_START_POINT";
const SET_END_POINT = "SET_END_POINT";
const RESET_START_END = "RESET_START_END";
const RESET_FLIGHT_PATH = "RESET_FLIGHT_PATH";

const getFlightPath = (value) => ({ type: GET_FLIGHT_PATH, value });

const setStartPoint = (value) => ({ type: SET_START_POINT, value });

const setEndPoint = (value) => ({ type: SET_END_POINT, value });

const resetStartEnd = () => ({ type: RESET_START_END });

const resetFlightPath = () => ({ type: RESET_FLIGHT_PATH });

const updateFlightPath = (user, token) => {
  return async (dispatch, getState) => {
    // const opt = optDistance ? true : false;
    const startPoint = getState().flightPath.startPoint;
    const endPoint = getState().flightPath.endPoint;
    const airplane = getState().airplanes.selectedAirplane;
    console.log(airplane);
    const data = {
      airplane,
      startPoint,
      endPoint,
    };
    console.log(data);

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
    console.log("RESULT:", result);
    // const flightNums = Object.keys(result.route);
    console.log("FLIGHTNUMS:", result.route);

    const flightPath = result.route.map((key) => {
      return {
        lat: key.lat,
        lng: key.lon,
      };
    });
    console.log(flightPath);

    dispatch(getFlightPath(flightPath));
  };
};

export const actions = {
  setStartPoint,
  setEndPoint,
  resetStartEnd,
  resetFlightPath,
  getFlightPath,
};

export const thunks = {
  updateFlightPath,
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
    case RESET_FLIGHT_PATH: {
      return {
        ...state,
        flightPath: [],
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
