import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import ForwardIcon from "@mui/icons-material/Forward";
import ButtonGroup from "@mui/material/ButtonGroup";
import LastPageIcon from "@mui/icons-material/LastPage";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function ManageMoves({ onClickNext, onClickEnd, onClickReset }) {
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
            startIcon={<ForwardIcon />}
            color="primary"
            onClick={onClickNext}
          >
            Next
          </Button>
          <Button
            startIcon={<LastPageIcon />}
            color="primary"
            onClick={onClickEnd}
          >
            End
          </Button>
          <Button
            startIcon={<RestartAltIcon />}
            color="primary"
            onClick={onClickReset}
          >
            Reset honeycomb
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default ManageMoves;
