import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { connect, useSelector } from "react-redux";
import { setFilter, setFilteredProducts } from "../redux/actions";

function Tab({ categories, products, setFilteredProducts, setFilter }) {
  const [alignment, setAlignment] = React.useState("*");
  const filter = useSelector((state) => state.appReducer.filter);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    if (filter) {
      setFilter(false);
    } else {
      setFilter(true);
    }
    //filter the products here based on category selected
    const filteredProducts =
      newAlignment !== "*"
        ? products.filter((pr) => pr.category === newAlignment)
        : products;
    setFilteredProducts(filteredProducts);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="*">All</ToggleButton>

      {categories.map((category, index) => {
        console.log("CAT", category);
        return <ToggleButton value={category}>{category}</ToggleButton>;
      })}
    </ToggleButtonGroup>
  );
}

const mapStateToProps = (state) => ({
  categories: state.appReducer.categories,
  products: state.appReducer.products,
});

const mapDispatchToProps = (dispatch) => ({
  setFilteredProducts: (filtered_products) =>
    dispatch(setFilteredProducts(filtered_products)),
  setFilter: (filter) => dispatch(setFilter(filter)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Tab);
