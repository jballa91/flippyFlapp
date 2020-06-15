import { api } from "../config";

const SET_SELECTED_AIRPLANE = "SET_SELECTED_AIRPLANE";
const SET_AIRPLANE_LIST = "SET_AIRPLANE_LIST";
// const GET_AIRPLANE_LIST = "GET_AIRPLANE_LIST";

const setSelectedAirplane = (value) => ({ type: SET_SELECTED_AIRPLANE, value });
const setAirplaneList = (value) => ({ type: SET_AIRPLANE_LIST, value });
// const getAirplaneList = (value) => ({ type: GET_AIRPLANE_LIST }, value);

export const actions = {
  setSelectedAirplane,
  // setAirplaneList,
  // getAirplaneList,
};

const initialAirplane = { airplaneList: [] };

const updateAirplaneList = (user, token) => {
  return async (dispatch, getState) => {
    const res = await fetch(`${api}/users/${user.id}/airplanes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const airplaneList = await res.json();

      dispatch(setAirplaneList(airplaneList));
    } else {
      console.log("error");
    }
  };
};

export const thunks = {
  updateAirplaneList,
};

function reducer(state = initialAirplane, action) {
  switch (action.type) {
    case SET_AIRPLANE_LIST: {
      return {
        ...state,
        airplaneList: action.value,
      };
    }
    case SET_SELECTED_AIRPLANE: {
      return {
        ...state,
        selectedAirplane: action.value,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
