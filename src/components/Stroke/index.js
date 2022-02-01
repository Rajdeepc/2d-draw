import React from "react";

export default function Stroke({
  selectedIndex,
  onSelect,
  brushColor,
  brushTypes,
}) {
  return brushTypes.map((item, i) => {
    return (
      <div className={`stroke ${selectedIndex === i ? "active" : ""} `}  onClick={() => onSelect(item)}>
        <div
          className={`stroke-field`}
          style={{ background: brushColor, height: item }}
         
        ></div>
      </div>
    );
  });
}
