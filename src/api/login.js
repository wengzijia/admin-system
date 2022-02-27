import {get, post} from '@/utils/request.js'
import url from '@/utils/url.js'

export const loginAPI = (data) => {
  return post(`${url}/bjcc/login`,data)
}