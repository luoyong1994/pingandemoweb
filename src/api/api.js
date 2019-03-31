/* eslint-disable */
import {
  get,
  post
} from './http'

//封装请求方法
export const queryProductList = data => get("data/queryProduct.do", data);
export const submitCreateGroup = data => post("data/createGroup.do", data);
export const queryProductGroupInfo = data => post("data/selectOneGroup.do", data);
export const sendMessage = data => post("data/sendMessage.do", data);


