const GET_AIRPORT_COORDS = 'GET_AIRPORT_COORDS';

const getAirportCoords = value => ({ type: GET_AIRPORT_COORDS, value })

const updateAirportCoords = () => {
    return async (dispatch, getState) => {
        const airportData = await fetch('http://localhost:5000/airports/coords')

        try {
            if (airportData.ok) {
                if (airportData.ok) {
                    const { data } = await airportData.json()
                    dispatch(getAirportCoords(data))
                }
            }
        } catch (e) {
            console.log(e)
        }

    }
}

export const actions = {

}

export const thunks = {
    updateAirportCoords
}

const initialState = []

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_AIRPORT_COORDS: {
            return {
                ...state,
                airports: action.value
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer
