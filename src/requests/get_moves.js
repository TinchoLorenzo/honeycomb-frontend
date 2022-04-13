import axios from 'axios';
import config from '../config.json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const getNextMoves = (honeycombId, callback) => {
    axios({
        url: `${config.backend_url}/${honeycombId}/moves/next/`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    }).then((res) => {
        callback(res.data)
    }).catch((error) => {
        console.log(error);
    })
  };

export const getAllMoves = (honeycombId, callback) => {
    axios({
        url: `${config.backend_url}/${honeycombId}/moves/all/`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    }).then((res) => {
        callback(res.data)
    }).catch((error) => {
        console.log(error);
    })
  };
const exportFunctions = { getNextMoves, getAllMoves }
export default exportFunctions;