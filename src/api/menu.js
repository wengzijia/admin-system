import {get, post } from '@/utils/request.js'
import url from '@/utils/url.js'

/**
 * 获取当前
 */
export function queryMenuAPI(data) {
    return post(`${url}bjcc/authConfig/queryMenu`, data)
}