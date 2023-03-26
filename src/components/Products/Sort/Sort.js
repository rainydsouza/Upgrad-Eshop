import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SORTING_FILTERS } from "../../../common/constants";
import uuid from "react-uuid";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import "./Sort.css";

//eslint-disable-next-line
const Sort = ({ sortByFilter, onSortChange }) => {
	return (
		<Box className="sortContainer">
			<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
				<InputLabel id="demo-simple-select-label">Sort</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={sortByFilter}
					label="filter"
					name="filter"
					onChange={onSortChange}
				>
					{SORTING_FILTERS.map((filter) => (
						<MenuItem value={filter} key={uuid()}>
							{filter}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};

export default Sort;
