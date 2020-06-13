import { api } from "../config";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";

const GET_FLIGHT_PATH = "GET_FLIGHT_PATH";
const SET_START_POINT = "SET_START_POINT";
const SET_END_POINT = "SET_END_POINT";
const RESET_START_END = "RESET_START_END";
<<<<<<< HEAD
const SHOW_START = "SHOW_START";
const SHOW_END = "SHOW_END";
=======
const SHOW_START = 'SHOW_START';
const SHOW_END = 'SHOW_END';
>>>>>>> master

const getFlightPath = (value) => ({ type: GET_FLIGHT_PATH, value });

const setStartPoint = (value) => ({ type: SET_START_POINT, value });

const setEndPoint = (value) => ({ type: SET_END_POINT, value });

const resetStartEnd = () => ({ type: RESET_START_END });

<<<<<<< HEAD
const setStart = (value) => ({ type: SHOW_START, value });

const setEnd = (value) => ({ type: SHOW_END, value });
=======
const setStart = value => ({ type: SHOW_START, value })

const setEnd = value => ({ type: SHOW_END, value })
>>>>>>> master

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

    dispatch(getFlightPath(result.route));
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
};

const initialState = { flightPath: [] };

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
    case SHOW_END: {
      return {
        ...state,
<<<<<<< HEAD
        endButtonPressed: action.value,
      };
=======
        endButtonPressed: action.value
      }
>>>>>>> master
    }
    case SHOW_START: {
      return {
        ...state,
<<<<<<< HEAD
        startButtonPressed: action.value,
      };
=======
        startButtonPressed: action.value
      }
>>>>>>> master
    }
    default: {
      return state;
    }
  }
}

export default reducer;
