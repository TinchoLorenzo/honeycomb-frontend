import axios from 'axios';
import config from '../config.json';

const add_bee_to_honeycomb = (x, y, orientation, moves, honeycombId, callback) => {
    axios({
        url: `${config.backend_url}/${honeycombId}/bee/`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        data: {
            x: x,
            y: y,
            orientation: orientation,
            moves: moves,
          }
    }).then((res) => {
        callback(res.data.bee_id)
    }).catch((error) => {
        console.log(error);
    })
  };

export default add_bee_to_honeycomb;