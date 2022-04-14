import "./Honeycomb.css";
import bee_svg_yellow from "../images/bee_svg_yellow.png";
import bee_svg_black from "../images/bee_svg_black.png";
import bee_svg_blue from "../images/bee_svg_blue.png";
import bee_svg_green from "../images/bee_svg_green.png";
import bee_svg_orange from "../images/bee_svg_orange.png";
import bee_svg_pink from "../images/bee_svg_pink.png";
import bee_svg_red from "../images/bee_svg_red.png";
import bee_svg_turquoise from "../images/bee_svg_turquoise.png";
import bee_svg_white from "../images/bee_svg_white.png";

// Add all the bee images to the array to set the src of the img html
const beeColors = [
  bee_svg_yellow,
  bee_svg_black,
  bee_svg_blue,
  bee_svg_green,
  bee_svg_orange,
  bee_svg_pink,
  bee_svg_red,
  bee_svg_turquoise,
  bee_svg_white,
];

// Need to translate the image based on where it is heading
const translateByDegree = {
  0: [-50, 0],
  90: [0, 50],
  180: [50, 0],
  270: [0, -50],
  360: [-50, 0],
};

// Render the cell, either blank or with a bee or a sequence of bees
const Cell = ({ x, y, matrix, onCellClick }) => {
  return (
    <div
      className={`cell back-white`}
      style={{ cursor: onCellClick && "pointer" }}
      onClick={() => onCellClick && onCellClick(x, y)}
    >
      {matrix[x][y] !== 0 &&
        matrix[x][y] !== {} &&
        // The honeycomb could have more than one bee in the same position
        Object.values(matrix[x][y]).map((bee, index) => {
          return (
            <img
              className={`bee `}
              // Handle the orientation of the bee, and the z-index if there are others in the same cell
              style={{
                zIndex: index % 3,
                transform: `rotate(${bee.rotation}deg) translate(${
                  translateByDegree[bee.rotation][0] + 5 * (index % 3)
                }%, ${translateByDegree[bee.rotation][1] + 5 * (index % 3)}%)`,
              }}
              src={beeColors[bee.color % beeColors.length]}
              alt={"bee"}
            />
          );
        })}
    </div>
  );
};
// Component to render the honeycomb
const Matrix = ({ matrix, onCellClick }) => {
  return (
    <div className="matrix">
      {matrix?.map((row, y) => {
        return (
          <div key={y}>
            {row.map((col, x) => {
              return (
                <Cell
                  key={`${x}${y}`}
                  x={x}
                  y={row.length - y - 1}
                  matrix={matrix}
                  onCellClick={onCellClick}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Matrix;
