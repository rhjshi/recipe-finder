import React, { useState } from 'react';
import { Grid, Autocomplete, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import StickyNote from "./StickyNote";
import Chip from '@mui/material/Chip';

const useStyles = makeStyles({
	pageContainer: {
		height: '100vh',
		padding: '2rem 0rem',
	},
	chip: {
		border: '0.15rem solid white',
		margin: '1rem 2rem 1rem 0rem',
		borderRadius: '0rem',
		'& span' : {
			margin: '0rem 1rem',
		}
	},
	contentContainer: {
		padding: '2rem 0rem 0rem 2rem',
	},
});

function Fridge() {
	const classes = useStyles();
	const [value, setValue] = useState('');
	const [inputValue, setInputValue] = useState('');
	const [ingredients, setIngredients] = useState([]);
	const [recipes, setRecipes] = useState([]);
	const handleDelete = (ingredientToDelete) => {
		setIngredients((ingredients) => ingredients.filter((ingredient) => ingredient !== ingredientToDelete));
	}
	const handleChange = (event, newInputValue) => {
		setValue(newInputValue);
		if ((event.code === 'Enter' && event.type === 'keydown') || (event.type === 'click')) {
			if (ingredients.indexOf(newInputValue) === -1 && newInputValue !== null) {
				setIngredients(prevIngredients => [...prevIngredients, newInputValue]);
			}
			setInputValue('');
			setValue('');
		}
	}

	const getRecipesByIngredients = () => {
		const axios = require("axios").default;

		let url = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=";

		ingredients.forEach(ingredient => url += ingredient + ",");

		url += "&apiKey=a5d95ac3b32a423c976648d39c99f694"

		var options = {
			method: 'GET',
			url: url,
			params: {
			  number: '5',
			  type: 'main course'
			}
		};

		axios.request(options)
			.then(function (response) 
			{
				const newRecipes = [];
				response.data.forEach(res => {
					newRecipes.push({id: res.id, title: res.title, image: res.image});
				});
				setRecipes(newRecipes);
			})
			.catch(function (error) 
			{
				console.error(error);
			});
	}

	return (
		<Grid container className={classes.pageContainer}>
			<Grid item xs/>
			<Grid container item xs={8} style={{backgroundColor: 'lightgrey'}} className={classes.contentContainer}>
				<Grid item xs={8}>
					<Autocomplete 
						freeSolo 
						fullWidth 
						options={['apple', 'banana', 'pear']} 
						renderInput={(params) => <TextField {...params} label="add your ingredient" />}
						value={value}
						inputValue={inputValue}
						onChange={(event, item) => handleChange(event, item)}
						onInputChange={(event, newInputValue) => {
							setInputValue(newInputValue);
						}}
					/>
					{ingredients.map((item, index) => (
						<Chip key={index} label={item} variant="outlined" onDelete={() => handleDelete(item)} className={classes.chip} />
					))}
				</Grid>
				<Grid item xs={4}>
					<Button variant="outlined" onClick={getRecipesByIngredients} style={{marginLeft: '25px'}}>
						Search Recipes
					</Button>
				</Grid>
				<Grid container>
					{recipes.map((recipe, index) => (
						<StickyNote key={index} title={recipe.title} recipeId={recipe.id} image={recipe.image}/>
					))}
				</Grid>
			</Grid>
			<Grid item xs/>
		</Grid>
	)
}

export default Fridge;