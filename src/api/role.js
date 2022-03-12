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
 *  查询当前角色
 */
export const queryRoleAPI = (data) => {
    return post(`${url}bjcc/authConfig/queryRole`, data)
}