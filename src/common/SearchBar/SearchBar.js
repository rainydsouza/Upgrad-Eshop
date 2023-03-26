import React from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import PropTypes from "prop-types";
// eslint-disable-next-line

const SearchBar = ({queryProduct,onQueryHandler}) => {
	return (
		<Box className="wrapper">
			<TextField size="small" id="filled-size-normal" placeholder="Search..." variant="outlined"
				value={queryProduct} onChange={onQueryHandler}  InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon className="searchIcon"/>
						</InputAdornment>
					),
				}}/>
		</Box>
	);
};

SearchBar.propTypes = {
	queryProduct: PropTypes.string,
	onQueryHandler: PropTypes.func,
};

export default SearchBar;
