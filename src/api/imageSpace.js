import {get, post, upImg} from '@/utils/request.js'
import url from '@/utils/url.js'

/**
 * 添加文件夹
 */
export const addImgFileAPI = (data) => {
  return post(`${url}bjcc/img/addImgFile`,data)
}
/**
 * 查询所有文件
 * @param {*} data 
 * @returns 
 */
export const queryAllFile = (data) => {
  return post(`${url}/bjcc/img/queryAllFile`,data)
}
/**
 * 上传文件
 * imgId	当前文件id
 * file 文件
 * @param data 
 * @returns 
 */
export const fileUploadAPI = (data) => {
  return upImg(`${url}bjcc/img/fileUpload`,data)
}
/**
 * 删除文件 1-文件 2-文件夹
 * @param {*} data 
 * @returns 
 */
export const fileDelAPI = (data) => {
  return post(`${url}/bjcc/img/fileDel`,data)
}