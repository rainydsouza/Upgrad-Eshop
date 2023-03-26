import React from "react";

import CreatableSelect from "react-select/creatable";

const Creatable = () => (
  <CreatableSelect isClearable options={["Red", ["Orange"]]} />
);

export default Creatable;
