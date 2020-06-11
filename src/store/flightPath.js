const GET_FLIGHT_PATH = 'GET_FLIGHT_PATH';
const SET_START_POINT = 'SET_START_POINT';
const SET_END_POINT = 'SET_END_POINT';
const RESET_START_END = 'RESET_START_END';

const getFlightPath = value => ({ type: GET_FLIGHT_PATH, value });

const setStartPoint = value => ({ type: SET_START_POINT, value });

const setEndPoint = value => ({ type: SET_END_POINT, value });

const resetStartEnd = () => ({ type: RESET_START_END, })

const updateFLightPath = () => {
    return async (dispatch, getState) => {
        //some fetch request for the future
        dispatch(getFlightPath([
            { lat: 27.074498333081777, lng: -81.58646666706443 },
            { lat: 32.46383333285225, lng: -87.95405555602503 },
            { lat: 37.09399999968052, lng: -95.57200000004723 },
            { lat: 40.614964639338744, lng: -103.26428550007884 },
            { lat: 44.16236111118097, lng: -112.22066666743004 },
            { lat: 46.374500000137566, lng: -117.01538888899674 }
        ]))
    }
}

export const actions = {
    setStartPoint,
    setEndPoint,
    resetStartEnd,
}

export const thunks = {
    updateFLightPath,
}

const initialState = []

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_FLIGHT_PATH: {
            return {
                ...state,
                flightPath: action.value
            }
        }
        case SET_START_POINT: {
            return {
                ...state,
                startPoint: action.value
            }
        }
        case SET_END_POINT: {
            return {
                ...state,
                endPoint: action.value
            }
        }
        case RESET_START_END: {
            return {
                ...state,
                endPoint: {},
                startPoint: {},
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer
