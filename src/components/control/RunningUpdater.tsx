import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { userLocationState, RunningStatsState, nextPointAndRouteState } from "../../utils/State"

const RunningUpdater = () => {
    const userLocation = useRecoilValue(userLocationState)
    const nextPointAndRoute = useRecoilValue(nextPointAndRouteState)
    const [runningStats, setRunningStats] = useRecoilState(RunningStatsState)
    useEffect(() => {
        const updateRunningStats = () => {
        /**
         * Update the user's running stats state based on his current location, or if a new point is created.
         */
            
        }
        updateRunningStats();
    }, [userLocation, nextPointAndRoute])

}







export default RunningUpdater