import axios from "axios";
import { BASE_URL, getToken } from "./Common";

export const addRentItem = async (rentItem, toast) => {
    var formData = new FormData();
    formData.append('image1', rentItem.image1)
    formData.append('image2', rentItem.image2)
    formData.append('image3', rentItem.image3)
    formData.append('document', JSON.stringify({
        title: rentItem.title,
        description: rentItem.description,
        type: rentItem.type,
        people : rentItem.people,
        area: rentItem.area,
        amount: rentItem.amount,
        province: rentItem.province,
        available: rentItem.available,
        detailLocation: `${rentItem.street}, ${rentItem.ward}, ${rentItem.district}, ${rentItem.province}`
    }))
    await axios({
        method: 'post',
        url: `${BASE_URL}rentItem?token=${getToken()}`,
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData
    }).then(res => {
        toast.success("Thành công")
    }).catch(err => {
        toast.error("Không thành công")
    })
}

export const addBlog = async (blog, content, toast) => {
    var formData = new FormData();
    formData.append('image', blog.image)
    formData.append('document', JSON.stringify({
        title: blog.title,
        description: blog.description,
        content: content,
    }))
    await axios({
        method: 'post',
        url: `${BASE_URL}blog?token=${getToken()}`,
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData
    }).then(res => {
        toast.success("Thành công")
    }).catch(err => {
        toast.error("Không thành công")
    })
}