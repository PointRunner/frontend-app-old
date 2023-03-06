export interface IRunningStats {
    isRunning: boolean,
    distanceTravelled: number,
    secondsElapsed: number,
    distanceLeft: number,
    scoreAccumulated: number,
    speed: number,
    passedPoints: number,
}

export interface IRunningStatsInitializationData {
    distanceLeft: number,
    speed: number,
    isRunning?: boolean
}

export enum ERRORS {
    LOCATION_DISABLED
}