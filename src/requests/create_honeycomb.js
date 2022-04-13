import axios from 'axios';
import config from '../config.json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const create_honeycomb = (size, callback) => {
        axios({
            url: `${config.backend_url}/`,
            method: 'post',
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            },
            data: {
                size: size
            }
        }).then((res) => {
            callback(res.data.honeycomb_id)
        }).catch((error) => {
            console.log(error);
        })
  };
export default create_honeycomb;