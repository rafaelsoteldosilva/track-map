import createDataContext from './createDataContext';

import trackerApi from '../api/tracker';

const initialState = {
    trackName: '',
    locations: []
};

const trackReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const fetchTrack = dispatch => {
    return name => {};
};

const saveTrack = dispatch => {
    return async (name, locations) => {
        try {
            await trackerApi.post('/tracks', {
                name,
                locations
            });
        } catch (error) {
            console.log('TrackContext.js:: error: ', error)
        }
    };
};

const { Context, Provider } = createDataContext(
    trackReducer,
    { fetchTrack, saveTrack },
    initialState
);

const TrackProvider = Provider;
const TrackContext = Context;

export { TrackProvider, TrackContext };
