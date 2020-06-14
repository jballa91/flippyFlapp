//actions
const GET_FLIGHT_PLANS = 'GET_FLIGHT_PLANS';

//action-creators
const getFlightPlans = (value) => ({ type: GET_FLIGHT_PLANS, value });

//thunks
const updateFLightPlans = (user, token) => {
    return async (dispatch, getState) => {

        const flightPlanData = await fetch(`http://localhost:5000/users/${user.id}/flightplans`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })

        const flightPlans = await flightPlanData.json()
        dispatch(getFlightPlans(flightPlans.data))
    }
}

export const actions = {

}

export const thunks = {
    updateFLightPlans
}

const initialState = {}
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_FLIGHT_PLANS: {
            return {
                ...state,
                flightPlans: action.value
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;
