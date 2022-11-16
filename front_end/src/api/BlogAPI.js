import axios from "axios";
import { BASE_URL, getToken } from "./Common";

export const getBlogs = (setBlogs, pageNumber = 1) => {
  axios({
    method: 'get',
    url: `${BASE_URL}blog?page=${pageNumber}`,
    headers: {'Content-Type': 'application/json'},
  }).then(response => {
    setBlogs(response.data)
  })
}

export const getLimitBlogs = (setBlogs, limit) => {
  axios({
    method: 'get',
    url: `${BASE_URL}blog/limit/${limit}`,
    headers: {'Content-Type': 'application/json'},
  }).then(response => {
    setBlogs(response.data)
  })
}

export const getById = (id, setBlog) => {
    axios({
      method: 'get',
      url: `${BASE_URL}blog/${id}`,
      headers: {'Content-Type': 'application/json'},
    }).then(response => {
      setBlog(response.data)     
    })
}

export const getUserBlogs = (setBlogs, pageNumber = 1) => {
  axios({
    method: 'get',
    url: `${BASE_URL}user/blog?token=${getToken()}&page=${pageNumber}`,
    headers: {'Content-Type': 'application/json'},
  }).then(response => {
      setBlogs(response.data)
  })
}

export const deleteBlog = async (id, toast) => {
  await axios({
    method: 'delete',
    url: `${BASE_URL}blog?token=${getToken()}`,
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

export const editBlog = async (blog, content, toast) => {
  console.log(blog, content)
  await axios({
    method: 'patch',
    url: `${BASE_URL}blog?token=${getToken()}`,
    headers: {'Content-Type': 'application/json'},
    data: {
      id: blog.id,
      content: content,
      description: blog.description,
      title: blog.title
    }
  }).then(res => {
    toast.success("Thành công")
  }).catch(err => {
    toast.error("Không thành công")
  })
}

export const addCommentBlog = async (comment) => {
  await axios({
    method: 'post',
    url: `${BASE_URL}blog/addComment?token=${getToken()}`,
    headers: {'Content-Type': 'application/json'},
    data: {
      id: comment.id,
      message: comment.message
    }
  })
}

