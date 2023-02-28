export interface IRunningStats {
    isRunning: false
    distanceTravelled: number,
    secondsElapsed: number,
    distanceLeft: number,
    scoreAccumulated: number,
    speed: number
}

export enum ERRORS {
    LOCATION_DISABLED
}