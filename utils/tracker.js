import Tracker from '@openreplay/tracker';
import {v4 as uuidV4} from 'uuid'

function localGetUserId() {
   return uuidV4() 
}

export function startTracker(projectKey, config) {

    console.log("Starting tracker...")
    console.log("Custom configuration received: ", config)

    const getUserId = (config.userIdEnabled && config.getUserId) ? config.getUserId : localGetUserId
    let userId = null;

    const trackerConfig = {
        projectKey
    }

    console.log("Tracker configuration")
    console.log(trackerConfig)
    const tracker = new Tracker(trackerConfig);

    if(config.userIdEnabled) {
        userId = getUserId()
        tracker.setUserID(userId)
    }


    tracker.start();
    return {
        tracker,
        userId
    }
}
