import React, { useState } from "react";
import { SwatchesPicker } from "react-color";

export default function ColorPalette({
  onColorSelect,
}) {



  return (
    <React.Fragment>
      <SwatchesPicker onChange={onColorSelect} style={{ width: "231px" }} />
    </React.Fragment>
  );
}
