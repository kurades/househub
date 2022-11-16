import axios from 'axios'
import { BASE_URL, getToken } from "./Common";

export const getUsers = (setUsers, page = 1) =>  {
    axios({
      method: 'get',
      url: `${BASE_URL}admin/user?token=${getToken()}&page=${page}`,
      headers: {'Content-Type': 'application/json'},
    }).then(response => {        
        setUsers(response.data)
    })
}

export const getContracts = (setContracts, page = 1) =>  {
  axios({
    method: 'get',
    url: `${BASE_URL}admin/contract?token=${getToken()}&page=${page}`,
    headers: {'Content-Type': 'application/json'},
  }).then(response => {        
    setContracts(response.data)
  })
}

export const deleteUser = async (id, toast) => {
  await axios({
    method: 'delete',
    url: `${BASE_URL}admin/user?token=${getToken()}`,
    headers: {'Content-Type': 'application/json'},
    data: {
      id: id
    }
  }).then(res => {        
    toast.success("Thành công")
  }).catch(err => {
    toast.error("Không thành công")
  })
}

export const getReport = (setReport) =>  {
  axios({
    method: 'get',
    url: `${BASE_URL}admin/report?token=${getToken()}`,
    headers: {'Content-Type': 'application/json'},
  }).then(response => {        
    setReport(response.data.report)
  })
}

export const getAllNotifications = (setNotifications) =>  {
  axios({
    method: 'get',
    url: `${BASE_URL}admin/notification?token=${getToken()}`,
    headers: {'Content-Type': 'application/json'},
  }).then(response => {        
    setNotifications(response.data)
  })
}