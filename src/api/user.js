import {get, post } from '@/utils/request.js'
import url from '@/utils/url.js'

export function addMenuAPI(data) {
    console.log(post);
    return post(`${url}/bjcc/sp/addMenu`, data)
}

export function queryMenuAPI_(data) {
    console.log(post);
    return post(`${url}/bjcc/sp/queryMenu`, data)
}
/**
 *  查询当前用户
 */
export const queryUserAPI = (data) => {
    return post(`${url}bjcc/authConfig/queryUser`, data)
}