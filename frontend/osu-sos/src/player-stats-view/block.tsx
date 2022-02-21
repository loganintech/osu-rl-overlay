import {DetailedPlayer} from "../events";
import {Grid} from "@mui/material";
import React from "react";
import "./styles.css";
import {Drift, SkullCrossbones, SuperSonic} from "../icons";


export const PlayerStatsViewBlock = ({player}: { player?: DetailedPlayer }): JSX.Element => {
    if (!player) {
        return <></>
    }

    return <Grid item container direction="column" className="player-stats-container" xs={2.2}>
        <Grid container direction="row">
            {player.isDead &&
                <Grid item>
                    <SkullCrossbones/>
                </Grid>
            }
            {player.isSonic &&
                <Grid item>
                    <SuperSonic/>
                </Grid>
            }
            {player.isPowersliding &&
                <Grid item>
                    <Drift/>
                </Grid>
            }
        </Grid>

        <Grid container direction="row" justifyContent="space-between" item>
            <Grid item>
                Name
            </Grid>
            <Grid item>
                {player.name}
            </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between" item>
            <Grid item>
                Score
            </Grid>
            <Grid item>
                {player.score}
            </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between" item>
            <Grid item>
                Goals
            </Grid>
            <Grid item>
                {player.goals}
            </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between" item>
            <Grid item>
                Shots
            </Grid>
            <Grid item>
                {player.shots}
            </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between" item>
            <Grid item>
                Assists
            </Grid>
            <Grid item>
                {player.assists}
            </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between" item>
            <Grid item>
                Saves
            </Grid>
            <Grid item>
                {player.saves}
            </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between" item>
            <Grid item>
                Demos
            </Grid>
            <Grid item>
                {player.demos}
            </Grid>
        </Grid>
    </Grid>
}


