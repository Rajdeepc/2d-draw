import React from "react";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-regular-svg-icons";

export default class CanvasBoard extends React.Component {
  timeout;
  socket = io.connect(`http://localhost:5000/${this.props.sessionId}`);

  ctx;
  isDrawing = false;
  restore_array = [];
  index = -1;

  constructor(props) {
    super(props);
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
    // change brush color
    this.ctx.strokeStyle = newProps.color;
    // change stroke size
    this.ctx.lineWidth = newProps.size;
    // change background color
    // canvas.style.backgroundColor = newProps.backgroundColor;
  }

  drawOnCanvas() {
    var canvas = document.querySelector("#board");
    this.canvas = canvas
    this.ctx = canvas.getContext("2d");
    var ctx = this.ctx;

    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = window.innerHeight - 142;
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
  //  this.ctx.fillStyle = "white";
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
   // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    return (
      <div className="sketch" id="sketch">
        <canvas className="board" id="board"></canvas>
        <div className="tools">
          <button onClick={this.undo} id="undo">
            <i class="bi bi-arrow-clockwise"> </i>Undo
          </button>

          <button onClick={this.onClear} id="clear">
          <i class="bi bi-x-octagon"></i> Clear
          </button>
        </div>
      </div>
    );
  }
}
