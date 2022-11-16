import axios from 'axios'
import { BASE_URL, getToken } from './Common'

export const addContract = async (contract, toast) => {
    let d = new Date();
    d.setDate(d.getDate() + 30*contract.period)
    axios({
        method: 'post',
        url: `${BASE_URL}contract?token=${getToken()}`,
        headers: {'Content-Type': 'application/json'},
        data: {
            userId2 : contract.userId2,
            rent : contract.rent,
            rentItemId : contract.rentItemId,
            expirationDate: d.toLocaleDateString()
        }
    }).then(res => {
        toast.success("Thành công")
    }).catch(err => {
        toast.error(err.response.data.message)
    })
}

export const getUserContracts = (setContracts, pageNumber = 1) => {
    axios({
      method: 'get',
      url: `${BASE_URL}user/contract?token=${getToken()}&page=${pageNumber}`,
      headers: {'Content-Type': 'application/json'},
    }).then(response => {
        setContracts(response.data)
    })
  }