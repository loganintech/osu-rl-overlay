import {DetailedPlayer} from "../events";
import {Grid} from "@mui/material";
import React from "react";
import "./styles.css";
import {Drift, SkullCrossbones, SuperSonic} from "../icons";


export const PlayerStatsViewLine = ({player, inverted}: { player?: DetailedPlayer, inverted?: boolean }): JSX.Element => {
    if (!player) {
        return <></>
    }

    return <Grid item container direction={inverted ? 'row-reverse' : 'row'} className="player-stats-container player-stats-line"
                 style={{outline: "2px solid red"}}>

        <Grid item container direction="column" justifyContent="center" style={{width: '200px', height: '50px'}} className="player-stats-view-line-text">
            Name: {player.name}
        </Grid>

        {player.isDead &&
            <Grid item container direction="column" justifyContent="center" style={{width: '50px'}}>
                <SkullCrossbones/>
            </Grid>
        }
        {player.isSonic &&
            <Grid item container direction="column" justifyContent="center" style={{width: '50px'}}>
                <SuperSonic/>
            </Grid>
        }
        {player.isPowersliding &&
            <Grid item container direction="column" justifyContent="center" style={{width: '50px'}}>
                <Drift/>
            </Grid>
        }


    </Grid>
}


