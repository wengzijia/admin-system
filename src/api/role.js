import { post } from '@/utils/request.js'
import url from '@/utils/url.js'

/**
 *  查询当前角色
 */
export const queryRoleAPI = () => {
        return post(`${url}bjcc/authConfig/queryRole`)
    }
    /**
     *  添加角色
     */
export const addRoleAPI = (data) => {
        return post(`${url}bjcc/authConfig/addRole`, data)
    }
    /**
     *  更新角色
     */
export const updateRoleAPI = (data) => {
    return post(`${url}bjcc/authConfig/updateRole`, data)
}