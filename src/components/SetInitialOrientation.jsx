import { Button } from "@material-ui/core";
import Slider from "@mui/material/Slider";
import ForwardIcon from "@mui/icons-material/Forward";

const SetInitialOrientation = ({ onRotation, onUpdateRange, onClickNext }) => {
  return (
    <>
      <Slider
        value={size}
        onChange={onUpdateRange}
        marks
        min={0}
        max={10}
        step={1}
        valueLabelDisplay="auto"
      />
      <Button startIcon={<ForwardIcon />} color="primary" onClick={onClickNext}>
        Next
      </Button>
    </>
  );
};

export default SetHoneycombSize;
