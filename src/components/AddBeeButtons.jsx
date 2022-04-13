import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@material-ui/core";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import ForwardIcon from "@mui/icons-material/Forward";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ButtonGroup from "@mui/material/ButtonGroup";

function AddBeeButtons({ onClickAddBee, setBeeRotation, onClickNext }) {
  const [moves, setMoves] = useState("");
  const [degrees, setDegrees] = useState(0);
  const onClickMoveRotateRight = () => {
    setMoves(moves + "R");
  };
  const onClickMoveRotateLeft = () => {
    setMoves(moves + "L");
  };
  const onClickMoveForward = () => {
    setMoves(moves + "M");
  };
  const onClickRemoveMove = () => {
    setMoves(moves.slice(0, -1));
  };
  const onClickInitRotateRight = () => {
    setDegrees((degrees + 90) % 360);
    setBeeRotation((degrees + 90) % 360);
  };
  const onClickInitRotateLeft = () => {
    if (degrees === 0) {
      setDegrees((degrees + 270) % 360);
      setBeeRotation((degrees + 270) % 360);
    } else {
      setDegrees((degrees - 90) % 360);
      setBeeRotation((degrees - 90) % 360);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            startIcon={<RotateLeftIcon />}
            color="primary"
            onClick={onClickInitRotateLeft}
          >
            Rotate left
          </Button>
          <Button
            startIcon={<RotateRightIcon />}
            color="primary"
            onClick={onClickInitRotateRight}
          >
            Rotate right
          </Button>
        </ButtonGroup>
      </Box>
      <Grid
        spacing={0}
        container={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <Button
            startIcon={<RotateLeftIcon />}
            color="primary"
            onClick={onClickMoveRotateLeft}
          >
            Rotate left
          </Button>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Button
            startIcon={<ForwardIcon />}
            color="primary"
            onClick={onClickMoveForward}
          >
            Move forward
          </Button>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Button
            startIcon={<RotateRightIcon />}
            color="primary"
            onClick={onClickMoveRotateRight}
          >
            Rotate right
          </Button>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Button
            startIcon={<BackspaceIcon />}
            color="primary"
            onClick={onClickRemoveMove}
          >
            Delete
          </Button>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <p>{moves}</p>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            startIcon={<AddCircleIcon />}
            color="primary"
            onClick={() => {
              onClickAddBee && onClickAddBee(moves);
              setMoves("");
              setDegrees(0);
            }}
          >
            Add bee
          </Button>
          <Button
            startIcon={<ForwardIcon />}
            color="primary"
            onClick={onClickNext}
          >
            Next
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default AddBeeButtons;
