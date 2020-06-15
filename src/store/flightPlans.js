import { api } from "../config";
//actions
const GET_FLIGHT_PLANS = "GET_FLIGHT_PLANS";
const GET_FLIGHT_PATH_ARR = "GET_FLIGHT_PATH_ARR";

//action-creators
const getFlightPlans = (value) => ({ type: GET_FLIGHT_PLANS, value });
const getFlightPathArr = (value) => ({ type: GET_FLIGHT_PATH_ARR, value });
//thunks
const updateFLightPlans = (user, token) => {
  return async (dispatch, getState) => {
    const flightPlanData = await fetch(`${api}/users/${user.id}/flightplans`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const flightPlans = await flightPlanData.json();

    const airportCoordsArr = [];

    for (let j = 0; j < flightPlans.data.length; j++) {
      const flightPath = flightPlans.data[j];

      let airportCoords = "";
      for (let i = 0; i < flightPath.route.length; i++) {
        const airportId = flightPath.route[i];

        const airportData = await fetch(`${api}//airports/${airportId}`);
        const { data } = await airportData.json();
        airportCoords += `|${data.lat},${data.lon}`;
      }
      airportCoordsArr.push(airportCoords);
    }

    dispatch(getFlightPlans(flightPlans.data));
    dispatch(getFlightPathArr(airportCoordsArr));
  };
};

export const actions = {};

export const thunks = {
  updateFLightPlans,
};

const initialState = {};
function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FLIGHT_PLANS: {
      return {
        ...state,
        flightPlans: action.value,
      };
    }
    case GET_FLIGHT_PATH_ARR: {
      return {
        ...state,
        flightPathArr: action.value,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
