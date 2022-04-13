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
const SET_HONEYCOMB = 'Set honeycomb size';
const ADD_BEE = 'Add bee';
const MOVE_BEES = 'Move bees';

function App() {
  const [honeycombId, setHoneycombId] = useState('')
  const [bees, setBees] = useState([])
  const [lastMove, setLastMove] = useState([])
  const [beeAction, setBeeAction] = useState(SET_HONEYCOMB)
  const [matrix, setMatrix] = useState(null)
  const [size, setSize] = useState(1);
  const [beeCount, setBeeCount] = useState(0)
  const [previousCell, setPreviousCell] = useState(null)
  const updateRange = (e, data) => {
    setSize(data + 1);
  };

  useEffect(() => {
      if (size === 0) {
        setMatrix(null)
      } else {
          setMatrix(new Array(size).fill(0).map(() => Array(size).fill(0)))
      }
  }, [size])

  useEffect(() => {
    const mapIndexWithBeeId = {}
    let newBee = {}
    bees.forEach((bee, index) => {
      const {x, y, beeIndex, bee_id, moves} = bee
      if (matrix[x][y][beeIndex]) {
        delete matrix[x][y][beeIndex]
      }
      newBee['moves'] = moves
      mapIndexWithBeeId[bee_id] = beeIndex
    })
    let newBees = []
    lastMove.forEach((move, index) => {
      const {x, y, orientation, bee_id} = move
      if (x < 0 || y < 0) {
        alert('Careful! The bee with id ' + bee_id + ' has fallen outside of the honeycomb')
      } else {
        const beeIndex = mapIndexWithBeeId[bee_id]
        if (matrix[x][y] === 0) {
          matrix[x][y] = {}
        } 
        matrix[x][y][beeIndex] = {
          color: beeIndex % 5,
          rotation: parseDegrees(orientation),
        }    
        newBees.push({...newBee, ...{
          bee_id: bee_id,
          beeIndex: beeIndex,
          x: x,
          y: y,
          orientation: orientation
        }})
      }
    })
      const newMatrix = matrix?.map((row, x) => {
        return row
      })
      setMatrix(newMatrix)
      setBees(newBees)
    }, [lastMove])

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

  const setBeeRotation = (degrees) => {
    if (previousCell){
      matrix[previousCell[0]][previousCell[1]][beeCount-1].rotation = degrees
      setMatrix([...matrix])
    }
  }

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
        bee_data = {
          color: beeIndex % 5,
          rotation: prevRotation,
        }
        if (matrix[x][y] === 0) {
          matrix[x][y] = {}
        }
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
                {beeAction === SET_HONEYCOMB && <SetHoneycombSize 
                  size={size}
                  onUpdateRange={updateRange}
                  onClickNext={() => {
                    create_honeycomb(size, (honeycomb_id) => { setHoneycombId(honeycomb_id) })
                  }}
                />}
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
              {matrix ?
                <Card className='Card' style={{background: 'transparent'}}>
                      <Matrix
                        matrix={matrix}
                        onCellClick={clickCell}
                        />
                  </Card>
                :
                false}
              </Grid>
        </Grid>
    </div>
  );
}

export default App;
