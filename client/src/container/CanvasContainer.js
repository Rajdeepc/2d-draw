import React,{useState} from "react";
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
  const [backgroundColor, setBackGroundColor] = useState('black');


  const handleSelectColor = (e) => {
    setSelectedBrushColor(e.target.value);
  };

  const onStrokeSelected = (strokeWidth) => {
    setDrawWidth(strokeWidth);
    setSelectedIndex(allBrushtypes.findIndex((item) => item === strokeWidth));
  };

  const handleColorSelected = (color) => {
    setBackGroundColor(color.hex);
  };



  return (
    <div className="App">
      <div className="canvas-palette">
      <CanvasBoard size={draw_width} color={selectedBrushColor} backgroundColor={backgroundColor}/>
      </div>
      <div className="controls">
        <div className="section background-color">
          <label>Choose Palette Color</label>
          <div className="color-chooser">
            <ColorPalette
              palette={palette}
              onColorSelect={handleColorSelected}
            />
          </div>
        </div>
        <div className="section stroke-selection">
          <label>Choose Stroke</label>
          <Stroke
            onSelect={onStrokeSelected}
            selectedIndex={selectedIndex}
            brushColor={selectedBrushColor}
            brushTypes={allBrushtypes}
          />
        </div>
        <div className="section draw-color">
          <label>Choose Brush Color</label>
          <div className="color-chooser">
            <input
              type="color"
              className="color-picker"
              onChange={handleSelectColor}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}
