import { api } from "../config";

const GET_FLIGHT_PATH = "GET_FLIGHT_PATH";
const SET_START_POINT = "SET_START_POINT";
const SET_END_POINT = "SET_END_POINT";
const RESET_START_END = "RESET_START_END";
const SHOW_START = "SHOW_START";
const SHOW_END = "SHOW_END";
const GET_FLIGHT_PATH_OBJS = "GET_FLIGHT_PATH_OBJS";

const getFlightPath = (value) => ({ type: GET_FLIGHT_PATH, value });

const setStartPoint = (value) => ({ type: SET_START_POINT, value });

const setEndPoint = (value) => ({ type: SET_END_POINT, value });

const resetStartEnd = () => ({ type: RESET_START_END });

const setStart = (value) => ({ type: SHOW_START, value });

const setEnd = (value) => ({ type: SHOW_END, value });

const getFlightPathObjs = (value) => ({ type: GET_FLIGHT_PATH_OBJS, value });

const updateFLightPath = (optDistance, optLandings, user, token) => {
  return async (dispatch, getState) => {
    const opt = optDistance ? true : false;
    const startPoint = getState().flightPath.startPoint;
    const endPoint = getState().flightPath.endPoint;
    const airplane = getState().airplanes.selectedAirplane;
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

    await dispatch(getFlightPath(result.route));

    const flightPathObjsArray = [];
    for (let i = 0; i < result.route.length; i++) {
      const coords = result.route[i];
      const result2 = await fetch(`${api}/airports/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coords),
      });

      const airport = await result2.json();

      flightPathObjsArray.push(airport.data);
    }

    dispatch(getFlightPathObjs(flightPathObjsArray));
  };
};

const updateFlightPathObjs = (token) => {
  return async (dispatch, getState) => {
    debugger;
    const flightPath = await getState().flightPath.flightPath;
    const flightPathObjsArray = flightPath.map(async (coords) => {
      const result = await fetch(`${api}/airports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(coords),
      });
      const airport = await result.json();
      return airport.data;
    });
    dispatch(getFlightPathObjs(flightPathObjsArray));
  };
};

export const actions = {
  setStartPoint,
  setEndPoint,
  resetStartEnd,
  setStart,
  setEnd,
};

export const thunks = {
  updateFLightPath,
  updateFlightPathObjs,
};

const initialState = { flightPath: [], flightPathObjs: [] };

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
        flightPathObjs: [],
      };
    }
    case SHOW_END: {
      return {
        ...state,
        endButtonPressed: action.value,
      };
    }
    case SHOW_START: {
      return {
        ...state,
        startButtonPressed: action.value,
      };
    }
    case GET_FLIGHT_PATH_OBJS: {
      return {
        ...state,
        flightPathObjs: action.value,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
