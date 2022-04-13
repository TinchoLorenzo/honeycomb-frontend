import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
// import './creator.css'
import { Cell, Matrix } from './Honeycomb';

const NO_ACTION_BEE = 'No action bee';
const ADD_BEE = 'Add bee';
const DELETE_BEE = 'Delete bee';
const SELECT_BEE = 'Select bee';

function Creator (props) {
    // const [matrix, setMatrix] = useState({})
    const { matrix } = props.matrix
    const [beeAction, setBeeAction] = useState(ADD_BEE)
  
    const clickCell = (x, y, bee_data) => {
        switch(beeAction) {
            case ADD_BEE:
                break;
            case DELETE_BEE:
                break;
            case SELECT_BEE:
                break;
            default:
                break;
        }
      const newNumber = matrix[x][y] ? 0 : 1
      matrix[x][y] = newNumber
      setMatrix([...matrix])
    }, [beeAction]
  
    return (
      <>
        <Card className='Card'>
          {/* <h1>Color Inc level creator</h1> */}
          {/* <div className='Form'> */}
            <Matrix
              matrix={matrix}
              onCellClick={clickCell}
            />
          {/* </div> */}
          {/* <Upload matrix={matrix} size={size} /> */}
        </Card>
      </>
    )
  }
  
  export default Creator