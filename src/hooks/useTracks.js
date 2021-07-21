import { useContext } from 'react';

import { LocationContext } from '../context/LocationContext';
import { TrackContext } from '../context/TrackContext';

export default useTracks = () => {
    const { state: {trackName, locations} } = useContext(LocationContext);
    const { saveTrack } = useContext(TrackContext);

    const saveTrackToDB = () => {
        saveTrack(trackName, locations)
    }

    return [ saveTrackToDB ]
}