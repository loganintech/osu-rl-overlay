import React, {useEffect, useState} from 'react';
import './App.css';
import useWebSocket, {ReadyState} from "react-use-websocket";
import {Ball, BallHit, DetailedPlayer, GameUpdateState, MatchEnded, SOSEvent} from "./events";
import {Grid} from "@mui/material";
import {PlayerStatsViewBlock} from "./player-stats-view/block";
import {PlayerStatsViewLine} from "./player-stats-view/line";

class Game {
    // region Data
    blueTeam: Map<string, DetailedPlayer> = new Map();
    orangeTeam: Map<string, DetailedPlayer> = new Map();
    match_guid: string = "";
    ball?: Ball;
    lastHit?: DetailedPlayer;
    // During Regulation time, counts down from max time starts.
    timeSeconds?: number;
    isOT?: boolean;
    isReplay?: boolean;
    winningTeam?: number;
    target?: string;

    // endregion

    private reset() {
        this.blueTeam.clear();
        this.orangeTeam.clear();
        this.match_guid = "";
        this.ball = undefined;
        this.lastHit = undefined;
        this.timeSeconds = 0;
        this.isOT = undefined
    }

    private static getPlayers(map: Map<string, DetailedPlayer>): Array<DetailedPlayer> {
        const players: Array<DetailedPlayer> = Array.from(map.values());
        players.sort((p, p2) => p.name > p2.name ? 1 : -1)
        return players
    }

    public getBluePlayers(): Array<DetailedPlayer> {
        return Game.getPlayers(this.blueTeam)
    }

    public getOrangePlayers(): Array<DetailedPlayer> {
        return Game.getPlayers(this.orangeTeam)
    }

    public getTarget(): DetailedPlayer | undefined {
        if (!this.target) {
            return
        }
        return this.blueTeam.get(this.target) || this.orangeTeam.get(this.target)
    }

    public ballHit(event: BallHit) {
        const lastHit = this.blueTeam.get(event.player.name) || this.orangeTeam.get(event.player.name);
        if (!lastHit) {
            console.log("Couldn't find last hit", lastHit, this.blueTeam, this.orangeTeam)
            return
        }
        this.lastHit = lastHit
    }

    public parseUpdate(event: GameUpdateState) {
        if (event.match_guid !== this.match_guid) {
            this.reset()
            this.match_guid = event.match_guid
        }

        this.target = event.game.target
        this.isReplay = event.game.isReplay
        this.isOT = event.game.isOT
        this.timeSeconds = event.game.time_seconds
        this.ball = event.game.ball
        this.updatePlayers(event)
    }

    public gameEnded(event: MatchEnded) {
        this.winningTeam = event.winner_team_num
    }

    private updatePlayers(event: GameUpdateState) {
        this.blueTeam.clear()
        this.orangeTeam.clear()

        for (const playerID in event.players) {
            const player = event.players[playerID]
            const playerData = event.players[player.id]
            if (playerData.team === 0) {
                this.blueTeam.set(player.name, playerData)
            } else if (playerData.team === 1) {
                this.orangeTeam.set(player.name, playerData)
            }
        }
    }
}

function App() {
    const socketUrl = 'ws://localhost:49122';
    const [game, setGame] = useState<Game>(new Game())

    const {
        lastMessage,
        readyState,
    } = useWebSocket(socketUrl);

    useEffect(() => {
        if (!lastMessage)
            return

        const event = JSON.parse(lastMessage.data) as SOSEvent

        switch (event.event) {
            case "game:update_state":
                game.parseUpdate(event.data)
                break
            case "sos:version":
                break
            case "game:ball_hit":
                game.ballHit(event.data)
                break
            case "game:clock_stopped":
                break
            case "game:goal_scored":
                break
            case "game:post_countdown_begin":
                break
            case "game:statfeed_event":
                break
            case "game:replay_start":
                break
            case "game:replay_end":
                break
            case "game:pre_countdown_begin":
                break

            case "game:match_ended":
                game.gameEnded(event.data)
                break
            case "game:initialized":
                break
            case "game:match_destroyed":
                break
            case "game:match_created":
                break
        }

        setGame(game)
    }, [lastMessage, game])

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <Grid container direction="column">
            <Grid container direction="row" justifyContent="space-between">
                <Grid container direction="column" item style={{width: '600px'}}>
                    {game.getBluePlayers().map(player => {
                        return <Grid item>
                            <PlayerStatsViewLine player={player}/>
                        </Grid>
                    })}
                </Grid>
                <Grid container direction="column" item style={{width: '600px'}}>
                    {game.getOrangePlayers().map(player => {
                        return <Grid item>
                            <PlayerStatsViewLine player={player} inverted={true}/>
                        </Grid>
                    })}
                </Grid>
            </Grid>
            {/*<Grid item>*/}
            {/*    Frontend - {connectionStatus}*/}
            {/*</Grid>*/}
            {/*{game.timeSeconds && <>*/}
            {/*    <Grid item>*/}
            {/*        Seconds: {game.timeSeconds}*/}
            {/*    </Grid>*/}
            {/*    <Grid item>*/}
            {/*        OT: {game.isOT ? "OT!" : "Not OT"}*/}
            {/*    </Grid>*/}
            {/*    <Grid item>*/}
            {/*        Replay: {game.isReplay ? "Replay!" : "Not Replay"}*/}
            {/*    </Grid>*/}
            {/*</>}*/}
            {/*{game.ball?.location && game.ball?.speed && <>*/}
            {/*    <Grid item>*/}
            {/*        Ball - {game.ball?.location.X} - {game.ball?.location.Y} - {game.ball?.location.Z}*/}
            {/*    </Grid>*/}
            {/*    <Grid item>*/}
            {/*        Ball Speed - {game.ball?.speed}*/}
            {/*    </Grid>*/}
            {/*</>*/}
            {/*}*/}

            {/*{game.lastHit &&*/}
            {/*    <Grid item>*/}
            {/*        Last Hit - {game.lastHit?.name}*/}
            {/*    </Grid>*/}
            {/*}*/}


            {/*{game.getTarget() &&*/}
            {/*    <Grid item>*/}
            {/*        <PlayerStatsViewBlock player={game.getTarget()}/>*/}
            {/*    </Grid>*/}
            {/*}*/}
        </Grid>
    );
}

export default App;
