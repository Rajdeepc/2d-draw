import React from "react";

export default function Stroke({
  selectedIndex,
  onSelect,
  brushColor,
  brushTypes,
}) {
  return (brushTypes() || []).map((item, i) => {
    return (
      <div className={`stroke`}  onClick={() => onSelect(item)}>
        <div
          className={`stroke-field ${selectedIndex === i ? "active" : ""} `}
          style={{ background: brushColor, height: `${item}px`, width:`${item}px`, borderRadius: '50%' }}
         
        ></div>
        {/* <p>{item}px</p> */}
      </div>
    );
  });
}
