import { server } from '../config/index'
import axios from 'axios';

export const getExamples = async (example) => {
    return await fetch(`${server}/api/mongo/documentation/${example}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json());
}

