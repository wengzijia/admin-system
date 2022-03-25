import { post } from '@/utils/request.js'
import url from '@/utils/url.js'

/**
 *  查询当前用户菜单
 */
export function queryMenuAPI(data) {
    return post(`${url}bjcc/authConfig/queryMenu`, data)
}
/**
 *  添加菜单
 */
export function addMenuAPI(data) {
    return post(`${url}bjcc/authConfig/addMenu`, data)
}

/**
 *  编辑菜单
 */
export function updateMenuAPI(data) {
    return post(`${url}bjcc/authConfig/updateMenu`, data)
}

/**
 *  删除菜单
 */
export function delMenuAPI(data) {
    return post(`${url}bjcc/sp/delMenu`, data)
}