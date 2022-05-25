import Tracker from '@openreplay/tracker';
import {useEffect} from 'react'

class MyTracker {
    static instance;
    static trackerState = {
        started: false
    }

    static startTracking() {
        const trackerConfig = {
            projectKey: process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY
        }

        console.log("Tracker configuration: ")
        console.log(trackerConfig)

        if(!MyTracker.instance) {
            MyTracker.instance = new Tracker(trackerConfig);
        }
        if(!MyTracker.trackerState.started) {
            MyTracker.instance.start()
            MyTracker.trackerState.started = true
        }
    }
}


function initializeTracker() {
    const trackerConfig = {
        projectKey: process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY
    }

    let trackerInstance = null;
    console.log("Callling initialize tracker")

    console.log("Tracker configuration: ")
    console.log(trackerConfig)
    return () => {
        console.log("Actually starting to track....")
        if(!trackerInstance) {
            trackerInstance = new Tracker(trackerConfig);
            trackerInstance.start()
        }
    }
    
}

const tracker = initializeTracker()

export default function Trackable(Component) {
    const TrackedComponent = ({...props}) => {
        useEffect(() => {
            //MyTracker.startTracking()
            tracker()
        }, [])   

        return (<Component {...props} />)

    }
    return TrackedComponent
}
