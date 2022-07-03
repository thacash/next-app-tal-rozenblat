import { server } from '../config/index'

export const getExamples = async (example) => {
    return await fetch(`${server}/api/mongo/documentation/${example}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json());
}

