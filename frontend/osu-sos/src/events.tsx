export type SOSEvent = { event: 'game:update_state', data: GameUpdateState }
    | { event: "sos:version", data: VersionEvent }
    | { event: "game:match_created", data: MatchCreatedEvent }
    | { event: "game:match_ended", data: MatchEnded }
    | { event: "game:match_destroyed", data: MatchDestroyed }
    | { event: "game:initialized", data: GameInitializedEvent }
    | { event: "game:pre_countdown_begin", data: PreCountdownBegin }
    | { event: "game:post_countdown_begin", data: PostCountdownBegin }
    | { event: "game:clock_stopped", data: ClockStopped }
    | { event: "game:ball_hit", data: BallHit }
    | { event: "game:replay_start", data: ReplayStart }
    | { event: "game:replay_start", data: ReplayEnd }
    | { event: "game:replay_end", data: ReplayWillEnd }
    | { event: "game:match_ended", data: GameEnd }
    | { event: "game:goal_scored", data: GoalScored }
    | { event: "game:statfeed_event", data: StatfeedEvent }
    | { event: "game:podium_start", data: PodiumStart }

export type Player = {
    id: string,
    name: string,
    team_num: 1 | 2
}

export type DetailedPlayer = {
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
    touches: number,
}

export type Ball = {
    location: {
        X: number,
        Y: number,
        Z: number,
    },
    speed: number,
    team: number,
}

export type GameUpdateState = {
    game: {
        arena: string,
        ball: Ball,
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
        [player_name: string]: DetailedPlayer
    },
}

export type VersionEvent = string

export type MatchCreatedEvent = {
    match_guid: string,
}

export type MatchDestroyed = {
    match_guid: string,
}

export type GameInitializedEvent = string
export type PreCountdownBegin = string
export type PostCountdownBegin = string

export type ClockStopped = {
    match_guid: string,
}

export type BallHit = {
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

export type ReplayStart = string

export type ReplayEnd = string

export type ReplayWillEnd = string

export type GameEnd = {
    winner_team_num: number
}


export type GoalScored = {
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
        teamnum: number,
    }
}


export type StatfeedEvent = {
    event_name: "Shot" | "Goal" | "Save" | "EpicSave" | "Assist",
    main_target: Player,
    secondary_target: Player,
    match_guid: string,
    type: string,
}

export type MatchEnded = {
    winner_team_num: number,
}

export type PodiumStart = string

