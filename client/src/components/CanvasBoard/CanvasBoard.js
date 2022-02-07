import React from "react";
import io from "socket.io-client";

export default class CanvasBoard extends React.Component {
  timeout;
  socket = io.connect("http://localhost:5000");

  ctx;
  isDrawing = false;
  restore_array = [];
  index = -1;

  constructor(props) {
    super(props);
    // this.state = {
    //   backgroundColor: "white",
    //   selectedIndex: -1,
    //   selectedBrushColor: "white",
    // };
    this.undo = this.undo.bind(this);
    this.onClear = this.onClear.bind(this);
    this.socket.on("canvas-data", function (data) {
      var root = this;
      var interval = setInterval(function () {
        if (root.isDrawing) return;
        root.isDrawing = true;
        clearInterval(interval);
        var image = new Image();
        var canvas = document.querySelector("#board");
        var ctx = canvas.getContext("2d");
        image.onload = function () {
          ctx.drawImage(image, 0, 0);

          root.isDrawing = false;
        };
        image.src = data;
      }, 200);
    });
  }

  componentDidMount() {
    this.drawOnCanvas();
  }

  componentWillReceiveProps(newProps) {
    var canvas = document.querySelector("#board");
    // change brush color
    this.ctx.strokeStyle = newProps.color;
    // change stroke size
    this.ctx.lineWidth = newProps.size;
    // change background color
    canvas.style.backgroundColor = newProps.backgroundColor
  }

  drawOnCanvas() {
    var canvas = document.querySelector("#board");
    this.ctx = canvas.getContext("2d");
    var ctx = this.ctx;

    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = window.innerHeight - 100;
    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = this.props.size;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = this.props.color;

    canvas.addEventListener(
      "mousedown",
      function (e) {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );
    var root = this;
    canvas.addEventListener(
      "mouseup",
      function () {
        ctx.stroke();
        ctx.closePath();

        if (window.event.type !== "mouseout") {
          root.restore_array.push(
            ctx.getImageData(0, 0, canvas.width, canvas.height)
          );
          root.index += 1;
        }
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );


    // canvas.addEventListener("mouseup", addArray, false);

    
    // var addArray = function () {
    //   if (window.event.type !== "mouseout") {
    //     root.restore_array.push(
    //       root.ctx.getImageData(0, 0, canvas.width, canvas.height)
    //     );
    //     root.index += 1;
    //   }
    // };

    // const resetBtn = document.getElementById("undo");
    // resetBtn.addEventListener("click", undo, false);

    // const clearBtn = document.getElementById("clear");
    // clearBtn.addEventListener("click", onClear, false);

   
    var onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (root.timeout != undefined) clearTimeout(root.timeout);
      root.timeout = setTimeout(function () {
        var base64ImageData = canvas.toDataURL("image/png");
        root.socket.emit("canvas-data", base64ImageData);
      }, 1000);
    };
  }

  undo() {
    if (this.index <= 0) {
      this.onClear();
    } else {
      this.index -= 1;
      this.restore_array.pop();
      this.ctx.putImageData(this.restore_array[this.index], 0, 0);
    }
  }

  onClear() {
    // this.ctx.fillStyle = "white";
    // this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    // this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  render() {
    return (
      <div className="sketch" id="sketch">
        <canvas className="board" id="board"></canvas>
        <div className="tools">
          <input type="button" id="undo" value="undo" onClick={this.undo} />
          <input
            type="button"
            id="clear"
            value="clear"
            onClick={this.onClear}
          />
        </div>
      </div>
    );
  }
}
