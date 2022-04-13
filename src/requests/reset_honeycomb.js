import axios from 'axios';
import config from '../config.json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const resetHoneycomb = (honeycombId, callback) => {
    axios({
        url: `${config.backend_url}/${honeycombId}/reset/`,
        method: 'patch',
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
export default resetHoneycomb;