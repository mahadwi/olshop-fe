import axios from 'axios'

const Api = axios.create({
    baseURL: 'https://dev-olshop.berkatsoft.com/api'
})

export default Api;