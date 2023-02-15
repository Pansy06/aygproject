import requests from './request'
import mockRequests from './mockRequets'
//三级联动接口
export const reqGetCategoryList = () => {
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}
export const reqGetBannerList = () => mockRequests.get("/banner");
//获取floor数据
export const reqGetFloorList = () => mockRequests.get("/floor");
//获取搜索模块数据 地址:/api/list  请求方式:post  参数:需要带参数
//当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchList = (params) => requests({ url: "/list", method: "post", data: params });
//获取商品详情 URL: /api/item{skuId} get
export const reqGetGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })
//添加修改购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
//获取购物车信息
export const reqGetCartList = () => {
    return requests({ url: '/cart/cartList', method: 'get' })
}
export const reqCartList = () => requests({ url: '/cart/cartList ', method: 'get' });
//删除
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
//修改商品的选中状态
export const reqUpdateCheckedByid = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
//获取注册验证码
export const reqGetCode = ( phone )=> {
    return requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
}
//注册
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'});
//登录
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'})
//请求头携带token获取用户信息
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})
//退出登录
export const reqLogOut = ()=>requests({url:'user/passport/logout',method:'get'})
//获取用户地址信息
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
//获取商品清单
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})
//提交订单
///api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
//获取支付信息
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});
//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export  const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});
//获取个人中心的数据
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});

