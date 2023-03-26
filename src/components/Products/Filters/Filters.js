import React from "react";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import uuid from "react-uuid";
import PropTypes from "prop-types";
import "./Filters.css";

const Filters = ({ filters, handleChange, selectedFilter, productsList }) => {
	return (
		<Grid Container className="filterContainer">
			<ToggleButtonGroup
				color="primary"
				value={selectedFilter}
				exclusive
				name="filter"
				onChange={handleChange}
				aria-label="Platform"
				size="small"
			>
				{filters.map((category) => (
					<ToggleButton
						key={uuid()}
						value={category}
						disabled={productsList.length === 0}
					>
						{category}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</Grid>
	);
};
export default Filters;

Filters.propTypes = {
	filters: PropTypes.array,
	handleChange: PropTypes.func,
	selectedFilter: PropTypes.string,
	productsList: PropTypes.array,
};
