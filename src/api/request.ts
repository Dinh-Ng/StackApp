import axios from 'axios'
import { apiLogger } from 'src/utilities/logger'

const request = axios.create({
    baseURL: 'https://api.stackexchange.com/2.2',
    timeout: 8000,
    headers: { Accept: '*/*' },
})

request.interceptors.request.use(
    async (config: any) => {
        // Do something before api is sent
        // logger('request', false, config)
        return config
    },
    (error: any) => {
        // Do something with api error
        apiLogger(
            `%c FAILED ${error.response.method?.toUpperCase()} from ${error.response.config.url}:`,
            'background: red; color: #fff',
            error.response,
        )
        return Promise.reject(error)
    },
)

request.interceptors.response.use(
    (response: any) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // logger('response', false, response)
        apiLogger(
            `%c SUCCESS ${response.config?.method?.toUpperCase()} from ${response?.config?.url}: `,
            'background: green; color: #fff',
            response,
        )
        return response.data
    },
    (error: any) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        apiLogger(
            `%c FAILED ${error.config?.method?.toUpperCase()} from ${error?.config?.url}:`,
            'background: red; color: #fff',
            error.response,
        )
        return Promise.reject(error)
    },
)

export default request
