import React from 'react'
import { Grid, Typography, Button} from '@mui/material';
import { makeStyles } from "@mui/styles";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const styles = {
    noteBrightPink: {
        backgroundColor: '#ff7eb9',
        position: 'relative',
        border: '0.1rem solid black',
        borderRadius: '0.5rem',
        width: '10rem',
        height: '13rem',
    },
    notePink: {
        backgroundColor: '#ff65a3',
        position: 'relative',
        border: '0.1rem solid black',
        borderRadius: '0.5rem',
        width: '10rem',
        height: '13rem',
    },
    noteBlue: {
        backgroundColor: '#7afcff',
        position: 'relative',
        border: '0.1rem solid black',
        borderRadius: '0.5rem',
        width: '10rem',
        height: '13rem',
    },
    noteLightYellow: {
        backgroundColor: '#feff9c',
        position: 'relative',
        border: '0.1rem solid black',
        borderRadius: '0.5rem',
        width: '10rem',
        height: '13rem',
    },
    noteYellow: {
        backgroundColor: '#fff740',
        position: 'relative',
        border: '0.1rem solid black',
        borderRadius: '0.5rem',
        width: '10rem',
        height: '13rem',
    },
    pin: {
        position: 'absolute',
        top: '0rem',
        left: '4rem',
    }
};

const useStyles = makeStyles(styles);

const StickyNote = (props) => {
    const classes = useStyles();
    const randomInt = Math.floor(Math.random() * 5);
	const { title, recipeId } = props;

    const getInstructionsByRecipeId = () => {
        const axios = require("axios").default;

        let url = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=a5d95ac3b32a423c976648d39c99f694`;
    
        var options = {
            method: 'GET',
			url: url,
			params: {
			  stepBreakdown: 'true',
			}
        }

        axios.request(options)
			.then(function (response) 
			{
                console.log(response);
                console.log(response.data[0].steps);
			})
			.catch(function (error) 
			{
				console.error(error);
			});
    }

    return (
			<Grid 
				item
				className={
						randomInt === 0 ? classes.noteBrightPink : randomInt === 1 ? classes.notePink : randomInt === 2 ? classes.noteBlue : 
						randomInt === 3 ? classes.noteLightYellow : classes.noteYellow
				}
			>
				{randomInt % 2 === 0 && (
						<FiberManualRecordIcon className={classes.pin}/>
				)}
				<Typography>{title}</Typography>
				<Typography>{recipeId}</Typography>
                <Button onClick={getInstructionsByRecipeId}>
                    instructions
                </Button>
			</Grid>
    )
};

export default StickyNote;
