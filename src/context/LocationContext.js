import createDataContext from './createDataContext';

const ADD_LOCATION = 'ADD_CURRENT_LOCATION';
const START_RECORDING = 'START_RECORDING';
const STOP_RECORDING = 'STOP_RECORDING';
const RESET = 'RESET';
const SET_TRACK_NAME = 'SET_TRACK_NAME';

const initialState = {
    trackName: '',
    currentLocation: null,
    locations: [],
    recording: false
};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LOCATION:

            return {
                ...state,
                locations: state.recording
                    ? [...state.locations, action.payload]
                    : [...state.locations],
                currentLocation: action.payload
            };

        case START_RECORDING:
            return { ...state, recording: true };

        case STOP_RECORDING:
            return { ...state, recording: false };

        case RESET:
            return { ...state, trackName: '', locations: [] };

        case SET_TRACK_NAME:
            return { ...state, trackName: action.payload };

        default:
            return state;
    }
};

const setTrackName = dispatch => {
    return name => {
        dispatch({ type: SET_TRACK_NAME, payload: name });
    };
};

const reset = dispatch => {
    return () => {
        dispatch({ type: RESET });
    };
};

const startRecording = dispatch => {
    return () => {
        dispatch({ type: START_RECORDING });
    };
};

const stopRecording = dispatch => {
    return () => {
        dispatch({ type: STOP_RECORDING });
    };
};

const addLocation = dispatch => {
    return newLocation => {
        dispatch({ type: ADD_LOCATION, payload: newLocation });
    };
};

const { Context, Provider } = createDataContext(
    locationReducer,
    { setTrackName, startRecording, stopRecording, addLocation, reset },
    initialState
);

const LocationProvider = Provider;
const LocationContext = Context;

export { LocationProvider, LocationContext };
