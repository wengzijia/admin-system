import {get, post} from '@/utils/request.js'
import url from '@/utils/url.js'

export function addMenuAPI (data) {
  console.log(post);
  return post(`${url}/bjcc/sp/addMenu`, data)
}

export function queryMenuAPI (data) {
  console.log(post);
  return post(`${url}/bjcc/sp/queryMenu`, data)
}