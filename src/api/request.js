//对axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css"
//request 是封装后的axios实例
const requests = axios.create({
    baseURL:"/api",
    //请求超时的时间
    timeout:5000,
});
//请求拦截器：在发送请求之前做一些事
requests.interceptors.request.use((config)=>{
    //config配置对象，其中header请求头很重要
    nprogress.start()
    return config;
})
requests.interceptors.response.use((res)=>{
    return res.data
    nprogress.done()
},(err)=>{
    //响应失败得回调函数
    return Promise.reject(new Error('fail'))
})

export default requests