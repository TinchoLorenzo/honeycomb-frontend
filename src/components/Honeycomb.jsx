import "./Honeycomb.css";
import bee_svg from "../images/bee_svg.png";

const translateByDegree = {
  0: [-50, 0],
  90: [0, 50],
  180: [50, 0],
  270: [0, -50],
  360: [-50, 0],
};

const Cell = ({ x, y, matrix, onCellClick }) => {
  return (
    <div
      className={`cell back-white`}
      style={{ cursor: onCellClick && "pointer" }}
      onClick={() => onCellClick && onCellClick(x, y)}
    >
      {matrix[x][y] !== 0 &&
        matrix[x][y] !== {} &&
        Object.values(matrix[x][y]).map((bee, index) => {
          return (
            <img
              className={`bee filter-yellow-${bee.color}`}
              style={{
                zIndex: index % 3,
                transform: `rotate(${bee.rotation}deg) translate(${
                  translateByDegree[bee.rotation][0] + 5 * (index % 3)
                }%, ${translateByDegree[bee.rotation][1] + 5 * (index % 3)}%)`,
              }}
              src={bee_svg}
              alt={"bee"}
            />
          );
        })}
    </div>
  );
};
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
