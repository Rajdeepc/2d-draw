import React, { useState } from "react";
import Stroke from "../components/Stroke/Stroke";
import ColorPalette from "../components/ColorPalette/ColorPalette";
import { palette } from "../utils/config";
import Header from "../components/Header/Header";
import { getOpacityInStep, selectIndex, allBrushtypes } from "../utils/helper";
import CanvasBoard from "../components/CanvasBoard/CanvasBoard";
import "../css/App.css";

export default function CanvasContainer() {
  //states
  const [selectedBrushColor, setSelectedBrushColor] = useState("black");

  const [draw_width, setDrawWidth] = useState("1");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [backgroundColor, setBackGroundColor] = useState("white");
  const [sessionId, setNewSessionId] = useState(undefined);

  const handleSelectColor = (e) => {
    setSelectedBrushColor(e.target.value);
  };

  const onStrokeSelected = (strokeWidth) => {
    setDrawWidth(strokeWidth);
    // setSelectedIndex(allBrushtypes.findIndex((item) => item === strokeWidth));
  };

  const handleColorSelected = (color) => {
    setBackGroundColor(color.hex);
  };

  const getSessionId = (id) => {
    setNewSessionId(id);
  };

  return (
    <div className="App">
      <div className="canvas-palette">
        <div className="header">
          <Header sessionId={getSessionId} />
        </div>
        <CanvasBoard
          sessionId={sessionId}
          size={draw_width}
          color={selectedBrushColor}
          backgroundColor={backgroundColor}
        />
      </div>
      <div className="controls">
        {/* <div className="section background-color">
          <label>Choose Palette Color</label>
          <div className="color-chooser">
            <ColorPalette
              palette={palette}
              onColorSelect={handleColorSelected}
            />
          </div>
        </div> */}
        <div className="section">
          <div className="stroke-selection">
            <div>Choose Stroke</div>
            <div>
              <input
                type="color"
                className="color-picker"
                onChange={handleSelectColor}
              />
            </div>
          </div>
        <div>
          <Stroke
            onSelect={onStrokeSelected}
            selectedIndex={selectedIndex}
            brushColor={selectedBrushColor}
            brushTypes={allBrushtypes}
          />
          </div>
        </div>
        {/* <div className="section draw-color">
          <label>Choose Brush Color</label>
          <div className="color-chooser"></div>
        </div> */}
      </div>
    </div>
  );
}
