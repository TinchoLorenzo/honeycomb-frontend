import './App.css';
import React, { useEffect, useState } from "react";
import Matrix from './components/Honeycomb';
import Card from '@mui/material/Card'
import Grid from "@mui/material/Grid";
import AddBeeButtons from './components/AddBeeButtons'
import SetHoneycombSize from './components/SetHoneycombSize'
import ManageMoves from './components/ManageMoves'
import create_honeycomb from './requests/create_honeycomb'
import add_bee_to_honeycomb from './requests/add_bee'
import { getNextMoves, getAllMoves } from './requests/get_moves'
import resetHoneycomb from './requests/reset_honeycomb'

// This is a function to convert from degrees as INT to the heading of the bees
const parseOrientation = (degrees) => {
  switch (degrees) {
    case 0:
      return 'N'
    case 90:
      return 'E'
    case 180:
      return 'S'
    case 270:
      return 'W'
    default:
      return 'N'
  }
}

// This is a function to convert from the heading of the bees to the degrees they are rotated
const parseDegrees = (orientation) => {
  switch (orientation) {
    case 'N':
      return 360
    case 'E':
      return 90
    case 'S':
      return 180
    case 'W':
      return 270
    default:
      return 360
  }
}

// Three consts to handle the state of the card on the left
const SET_HONEYCOMB = 'Set honeycomb size';
const ADD_BEE = 'Add bee';
const MOVE_BEES = 'Move bees';

function App() {
  // Honeycomb id give by the backend
  const [honeycombId, setHoneycombId] = useState('') 
  // Array of bees to handle the moves and position
  const [bees, setBees] = useState([]) 
  // Last move asked to the Backend. Used to display the bees on honeycomb
  const [lastMove, setLastMove] = useState([]) 
  // State of the card on the left (action panel)
  const [beeAction, setBeeAction] = useState(SET_HONEYCOMB) 
  // The matrix representing the honeycomb
  const [matrix, setMatrix] = useState([[0]]) 
  // Last coordinate of the honeycomb. Size 0 means the honeycomb has 1 cell
  const [size, setSize] = useState(0); 
  // How many bees are currently in the honeycomb
  const [beeCount, setBeeCount] = useState(0) 
  // Latest cell touched by the user. Used to remove the bee img from the honeycomb when adding a new bee
  const [previousCell, setPreviousCell] = useState(null) 
  // A map for beeIndex and bee_id given by the backend. This is necesary to maintain the colors and positions of the bees
  const [mapIndexWithBeeId, setMapIndexWithBeeId] = useState({}) // 
  
  // Function to update the honeycomb size when the slider changes
  const updateRange = (e, data) => {
    setSize(data);
  };

  // Create the matrix when the size changes
  useEffect(() => {
      if (size < 0) {
        setMatrix(null)
      } else {
          setMatrix(new Array(size+1).fill(0).map(() => Array(size+1).fill(0)))
      }
  }, [size])

  // useEffect to update the matrix state
  useEffect(() => {
    let newMapIndexWithBeeId = {...mapIndexWithBeeId}
    let newBee = {}
    // Iterate over the bees and remove them from the matrix. 
    // Retain the moves and update the bee_id and beeIndex map
    bees.forEach((bee, index) => {
      const {x, y, beeIndex, bee_id, moves} = bee
      if (!(x < 0 || y < 0) && matrix[x][y][beeIndex]) {
        delete matrix[x][y][beeIndex]
      }
      newBee['moves'] = moves
      newMapIndexWithBeeId[bee_id] = beeIndex
    })
    let newBees = []
    // Iterate over the latest moves requested to the backend
    lastMove.forEach((move, index) => {
      const {x, y, orientation, bee_id} = move
      // The bee is out of range
      if (x < 0 || y < 0) {
        alert('Careful! The bee with id ' + bee_id + ' has fallen outside of the honeycomb')
      } else {
        const beeIndex = newMapIndexWithBeeId[bee_id]
        // If the matrix has no bees in that position, create an empty object
        if (matrix[x][y] === 0) {
          matrix[x][y] = {}
        } 
        // Add the 'bee' to the matrix, with it's color and rotation as degrees
        matrix[x][y][beeIndex] = {
          color: beeIndex % 9,
          rotation: parseDegrees(orientation),
        }    
        // Prepare the new bees object that will updated at the end of the useEffect
        newBees.push({...newBee, ...{
          bee_id: bee_id,
          beeIndex: beeIndex,
          x: x,
          y: y,
          orientation: orientation
        }})
      }
    })
    // Needed to change the direction of the matrix in order for it to re-render
      const newMatrix = matrix?.map((row, x) => {
        return row
      })
      setMatrix(newMatrix)
      setBees(newBees)
      setMapIndexWithBeeId(newMapIndexWithBeeId)
    }, [lastMove])

    // Three callbacks to manage the positions of the bees in the honeycomb when calling the API
  const onGetNextMoves = () => {
    getNextMoves(honeycombId, (data) => {setLastMove(data)})
  }

  const onGetAllMoves = () => {
    getAllMoves(honeycombId, (data) => {
      if (data.length !== 0) {
        setLastMove(data[data.length - 1])}
      })
  }
  const onResetHoneycomb = () => {
    resetHoneycomb(honeycombId, (data) => {
      if (data && data.bees && data.bees.length !== 0) {
        setLastMove(data.bees);
      }
    })
  }

  // Callback for buttons that set the initial orientation of the bee
  const setBeeRotation = (degrees) => {
    if (previousCell){
      matrix[previousCell[0]][previousCell[1]][beeCount-1].rotation = degrees
      setMatrix([...matrix])
    }
  }

  // Callback when adding a new bee to the honeycomb with full data, not only in the cell
  const onClickAddBee = (moves) => {
    if (previousCell) {
      const x = previousCell[0];
      const y = previousCell[1];
      const orientation = parseOrientation(matrix[previousCell[0]][previousCell[1]][beeCount - 1].rotation);      
      add_bee_to_honeycomb(
        x, 
        y, 
        orientation,
        moves, 
        honeycombId,
        (bee) => { 
          // Important to update the bees state as now we have the bee_id from the backend
          setBees([...bees, {
            bee_id: bee,
            beeIndex: beeCount - 1,
            x: x,
            y: y,
            orientation: orientation,
            moves: moves
          }]);
          setPreviousCell(null)
        })
    }
  }

  // TODO: Remove switch as is not needed anymore
  // Remove the current bee from it's position, and assign it again to the latest clicked cell
  const clickCell = (x, y, bee_data) => {
    switch(beeAction) {
      case ADD_BEE:
        // Save the x and y for later
        // Remove latest adition of the same bee
        let beeIndex = beeCount
        let prevRotation = 0
        if (previousCell && previousCell !== [x, y]) {
          const prevX = previousCell[0]
          const prevY = previousCell[1]
          beeIndex = beeIndex - 1
          prevRotation = matrix[prevX][prevY][beeIndex].rotation
          delete matrix[prevX][prevY][beeIndex]
        }
        // Set the color and rotation from the previous state
        bee_data = {
          color: beeIndex % 9,
          rotation: prevRotation,
        }
        if (matrix[x][y] === 0) {
          matrix[x][y] = {}
        }
        // Add the bee to the matrix and save the clicked cell coordinates for the future
        matrix[x][y][beeIndex] = bee_data
          if (!previousCell) {
            setBeeCount(beeCount + 1)
          }
          setPreviousCell([x, y])
            break;
        default:
            break;
    }
  setMatrix([...matrix])
}
// Callback to set the honeycomb id when the axios async request is ready
useEffect( () => {
  if (honeycombId)
    setBeeAction(ADD_BEE)
}, [honeycombId])
  return (
    <div className="App"> 
    <h1>Honeycomb </h1>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          sx = {{
                width: '100%',
                height: '80%'
          }}
          >
            <Grid item xs={4}>
              <Card className='Card'>
                {/* First state, the left card is just a slider to set the honeycomb size */}
                {beeAction === SET_HONEYCOMB && <SetHoneycombSize 
                  size={size}
                  onUpdateRange={updateRange}
                  onClickNext={() => {
                    create_honeycomb(size, (honeycomb_id) => { setHoneycombId(honeycomb_id) })
                  }}
                />}
                {/* Second state, a set of buttons to manage the initial position and following moves of the bee */}
                {beeAction === ADD_BEE && <>
                  <AddBeeButtons 
                    onClickAddBee={onClickAddBee}
                    setBeeRotation={setBeeRotation} 
                    onClickNext={() => {
                      setBeeAction(MOVE_BEES)
                    }}
                    />
                  </>
                  }
                {/* Last state, with everything setted, the user can move one by one, see all moves 
                or reset the initial state */}
                {beeAction === MOVE_BEES && <>
                  <ManageMoves 
                    onClickAddBee={onClickAddBee}
                    setBeeRotation={setBeeRotation}
                    onClickNext={onGetNextMoves}
                    onClickEnd={onGetAllMoves}
                    onClickReset={onResetHoneycomb}
                    />
                    </>
                }
                </Card>
            </Grid>
            <Grid item xs={8}>
                {/* The honeycomb displayed as a matrix */}
              {matrix &&
                <Card className='Card' style={{background: 'transparent'}}>
                      <Matrix
                        matrix={matrix}
                        onCellClick={clickCell}
                        />
                  </Card>
                }
              </Grid>
        </Grid>
    </div>
  );
}

export default App;
