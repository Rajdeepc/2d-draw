import React from "react";

export default function index({ palette, onColorSelect }) {
  return palette.map((item) => (
    <div
      className="color-field"
      style={{ background: item }}
      onClick={() => onColorSelect(item)}
    ></div>
  ));
}
