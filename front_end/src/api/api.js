import axios from 'axios'

export const getProvinces = async () =>  {
    const temp = []
    await axios({
      method: 'get',
      url: `https://provinces.open-api.vn/api/?depth=1`,
      headers: {'Content-Type': 'application/json'},
    }).then(response => {        
        response.data.forEach(element => {
            temp.push({value: element.code, label: element.name});
        });
    })
    return temp
}

export const getDistricts = async (id) => {
    const temp = []
    axios({
      method: 'get',
      url: `https://provinces.open-api.vn/api/p/${id}?depth=2`,
      headers: {'Content-Type': 'application/json'},
    }).then(response => {
        response.data.districts.forEach(element => {
            temp.push({value: element.code, label: element.name});
        });
    })
    return temp
} 

export const getWards = async (id) => {
    const temp = []
    axios({
      method: 'get',
      url: `https://provinces.open-api.vn/api/d/${id}?depth=2`,
      headers: {'Content-Type': 'application/json'},
    }).then(response => {
        response.data.wards.forEach(element => {
            temp.push({value: element.code, label: element.name});
        });
    })
    return temp
} 
