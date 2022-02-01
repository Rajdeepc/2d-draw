import "./App.css";
import { useEffect, useRef, useState } from "react";
import Stroke from "./components/Stroke";
import ColorPalette from "./components/ColorPalette";
import { allBrushtypes, palette } from "./config";

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  //states
  const [selectedBrushColor, setSelectedBrushColor] = useState("black");

  const [draw_width, setDrawWidth] = useState("1");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [backgroundColor, setBackGroundColor] = useState('white')


  let isDrawing = false;

  let restore_array = [];
  let index = -1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth - 300;
      canvas.height = window.innerHeight - 100;
    }

    const context = canvas.getContext("2d");
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    // storing the context on a global ref
    contextRef.current = context;
  }, []);


  useEffect(() => {
    contextRef.current.fillStyle = backgroundColor;
  },[backgroundColor])


  const startDrawing = (event) => {
    const canvas = canvasRef.current;
    isDrawing = true;
    contextRef.current.beginPath();
    contextRef.current.moveTo(
      event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop
    );
    event.preventDefault();
  };

  const draw = (event) => {
    const canvas = canvasRef.current;
    if (isDrawing) {
      contextRef.current.lineTo(
        event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop
      );
      contextRef.current.strokeStyle = selectedBrushColor;
      contextRef.current.lineWidth = draw_width;
      contextRef.current.lineCap = "round";
      contextRef.current.lineJoin = "round";
      contextRef.current.stroke();
    }
    event.preventDefault();
  };

  const finishDrawing = (e) => {
    const canvas = canvasRef.current;
    if (isDrawing) {
      contextRef.current.stroke();
      contextRef.current.closePath();
      isDrawing = false;
    }
    e.preventDefault();

    if (e.type !== "mouseout") {
      restore_array.push(
        contextRef.current.getImageData(0, 0, canvas.width, canvas.height)
      );
      index += 1;
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    contextRef.current.fillStyle = backgroundColor;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    contextRef.current.fillRect(0, 0, canvas.width, canvas.height);
  };

  const undo = () => {
    if (index <= 0) {
      clear();
    } else {
      index -= 1;
      restore_array.pop();
      contextRef.current.putImageData(restore_array[index], 0, 0);
    }
  };

  const handleSelectColor = (e) => {
    setSelectedBrushColor(e.target.value);
  };

  const onStrokeSelected = (strokeWidth) => {
    setDrawWidth(strokeWidth);
    setSelectedIndex(allBrushtypes.findIndex((item) => item === strokeWidth));
  };

  const handleColorSelected = (color) => {
    setBackGroundColor(color);
  };



  return (
    <div className="App">
      <div className="canvas-palette">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
        ></canvas>
        <div className="tools">
          <button type="reset" onClick={undo}>
            UNDO
          </button>
          <button type="primary" onClick={clear}>
            CLEAR
          </button>
          <input type="range" min="1" max="100"/>
        </div>
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

export default App;
