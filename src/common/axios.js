import _axios from "axios";

const axios = baseURL => {
    //看有沒有傳入baseURL參數，如果沒有就用預設的URL'http://localhost:3003'
    const instance = _axios.create({
        baseURL: baseURL || 'http://localhost:3003',
        timeout: 1000,
        // headers: {'X-Custom-Header': 'foobar'}
    });

    return instance
}


export { axios };   //傳遞參數的
export default axios(); //不傳參數的