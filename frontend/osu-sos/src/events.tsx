
export type SOSEvent = GameUpdateState
| VersionEvent
| MatchCreatedEvent
| MatchDestroyed
| GameInitializedEvent
| PreCountdownBegin
| PostCountdownBegin
| ClockStopped
| BallHit
| ReplayStart
| ReplayEnd
| ReplayWillEnd
| GameEnd
| GoalScored

export type GameUpdateState = {
    event: 'game:update_state'
    data: {
        game: {
            arena: string,
            ball: {
                location: {
                    X: number,
                    Y: number,
                    Z: number,
                },
                speed: number,
                team: number,
            }
            hasTarget: boolean,
            hasWinner: boolean,
            isOT: boolean,
            isReplay: boolean,
            target: string,
            teams: [{
                color_primary: string,
                color_secondary: string,
                name: string,
                score: number
            }]
            time_milliseconds: number,
            time_seconds: number,
            winner: string,
        }
        hasGame: boolean,
        match_guid: string,
        players: {
            [player_name: string]: {
                assists: number,
                attacker: string,
                boost: number,
                cartouches: number,
                demos: number,
                goals: number,
                hasCar: boolean,
                id: string,
                isDead: boolean,
                isPowersliding: boolean,
                isSonic: boolean,
                location: {
                    X: number,
                    Y: number,
                    Z: number,
                    pitch: number,
                    roll: number,
                    yaw: number,
                },
                name: string,
                onGround: boolean,
                onWall: boolean,
                primaryID: string,
                saves: number,
                score: number,
                shortcut: number,
                shots: number,
                speed: number,
                team: number,
                touches: number
            }
        },
    }
}

export type VersionEvent = {
    event: "sos:version",
    data: string,
}

export type MatchCreatedEvent = {
    event: "game:match_created",
    data: {
        match_guid: string,
    },
}

export type MatchDestroyed = {
    event: "game:match_destroyed",
    data: {
        match_guid: string,
    },
}

export type GameInitializedEvent = {
    event: "game:initialized",
    data: string,
}

export type PreCountdownBegin = {
    event: "game:pre_countdown_begin",
    data: string,
}

export type PostCountdownBegin = {
    event: "game:post_countdown_begin",
    data: {}
}

export type ClockStopped = {
    event: "game:clock_stopped",
    data: {
        match_guid: string,
    },
}

export type BallHit = {
    event: "game:ball_hit",
    data: {
        ball: {
            location: {
                X: number,
                Y: number,
                Z: number,
            },
            post_hit_speed: number,
            pre_hit_speed: number,
        }
        match_guid: string,
        player: {
            id: string,
            name: string,
        }
    }
}

export type ReplayStart = {
    event: "game:replay_start",
    data: string,
}

export type ReplayEnd = {
    event: "game:replay_start",
    data: string,
}

export type ReplayWillEnd = {
    event: "game:replay_end",
    data: string,
}

export type GameEnd = {
    event: "game:match_ended",
    data: {
        winner_team_num: number
    },
}

export type GoalScored = {
    event: "game:goal_scored",
    data: {
        ball_last_touch: {
            player: string,
            speed: number,
        }
        assister: {
            id: string,
            name: string,
        }
        goalspeed: number,
        goaltime: number,
        impact_location: {
            X: number,
            Y: number
        }
        scorer: {
            id: string,
            name: string,
            teamnum: 0,
        }
    }
}


//     "game:statfeed_event": {
//     "event_name": "string",
//         "main_target": {
//         "id": "string",
//             "name": "string",
//             "team_num": "number"
//     },
//     "secondary_target": {
//         "id": "string",
//             "name": "string",
//             "team_num": "number"
//     },
//     "type": "string"
// },
//     "game:goal_scored": {
//     "ball_last_touch": {
//         "player": "string",
//             "speed": "number"
//     },
//     "goalspeed": "number",
//         "impact_location": {
//         "X": "number",
//             "Y": "number"
//     },
//     "scorer": {
//         "id": "string",
//             "name": "string",
//             "teamnum": "number"
//     }
// },
//     "game:match_ended": {
//     "winner_team_num": "number"
// },
//     "game:podium_start": "string",
// }