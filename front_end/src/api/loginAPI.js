import axios from "axios";
import { BASE_URL, getToken, removeUserSession, setTokenSession, setUserSession } from "./Common";

export const login = async (user, setError, history) => {
    await axios({
        method: 'post',
        url: `${BASE_URL}login`,
        headers: {'Content-Type': 'application/json'},
        data: {
            email: user.email,
            password: user.password
        }
    }).then(response => {
        setTokenSession(response.data.token)
        setUserSession(response.data.user)
        history.push("/")
    }).catch(error => {
        setError(error.response.data.message)
    })
}

export const register = async (user, errorInput, setErrorInput, history) => {
    await axios({
        method: 'post',
        url:  `${BASE_URL}register`,
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
        data: {
            email: user.email,
            name: user.username,
            password: user.password,
            repassword: user.repassword,
        }
    }).then(response => {
        history.push("/signin")
    }).catch(error => {
        if (error.response.status === 409) {
            setErrorInput({...errorInput, ["email"] : error.response.data.message})
        } else if (error.response.status === 400) {
            setErrorInput({...errorInput, ["email"] :  error.response.data[0].email, ["username"] :  error.response.data[0].name, ["password"] :  error.response.data[0].password, ["repassword"] :  error.response.data[0].repassword})
        }
    })
}

export const loginWithGG = async (idToken, setError, history) => {
    await axios({
        method: 'post',
        url: `${BASE_URL}loginWithGG`,
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
        data: {
            id_token: idToken,
        }
    }).then(response => {
        setUserSession(response.data['user'])
        setTokenSession(response.data['token'])
        history.push('/')
    }).catch(error => {
        setError(error.data.message)  
    })
}

export const getUserAuth = (setAuthLoading) => {
    axios({
      method: 'get',
      url: `${BASE_URL}user?token=${getToken()}`,
      headers: {'Content-Type': 'application/json'},
    }).then(response => {
      setUserSession(response.data)
      setAuthLoading(false)
    }).catch(error => {
      removeUserSession() 
      setAuthLoading(false)
    });
}

export const getUserById = (id, setUser) => {
    axios({
        method: 'get',
        url: `${BASE_URL}getUserById/${id}`,
        headers: {'Content-Type': 'application/json'},
    }).then(response => {
    setUser(response.data)
    })
}

export const updateProfile = async (user, toast) => {
    var formData = new FormData();
    if (user.image) formData.append('image', user.image)
    formData.append('document', JSON.stringify({
        name: user.name,
        phone: user.phone,
        zalo: user.zalo,
        fb: user.fb
    }))
    await axios({
        method: 'post',
        url: `${BASE_URL}updateProfile?token=${getToken()}`,
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData
    }).then(res => {
        toast.success("Thành công")
    }).catch ( err => {
        toast.error("Không thành công")
    })
}

export const changePasswordUser = async (inf, toast) => {
    await axios({
        method: 'patch',
        url: `${BASE_URL}user/password?token=${getToken()}`,
        headers: {'Content-Type': 'application/json'},
        data: {
            email: inf.email,
            id: inf.id,
            oldPassword : inf.oldPassword,
            newPassword: inf.newPassword
        }
    }).then(res => {
        toast.success("Thành công")
    }).catch ( err => {
        if (err.response.status == 404)
        toast.error("Mật khẩu cũ không đúng")
        else toast.error("Mật khẩu mới phải dài hơn 8 kí tự")
    })
}

export const resetPassword = async (email, toast) => {
    await axios({
        method: 'post',
        url: `${BASE_URL}user/resetPassword`,
        headers: {'Content-Type': 'application/json'},
        data: {
            email: email
        }
    }).then(res => {
        toast.success("Gửi thành công, vui lòng check mail")
    }).catch ( err => {
        if (err.response.status == 404)
        toast.error("Email không tồn tại trong hệ thống")
        else toast.error("Có lỗi khi gửi, vui lòng thử lại")
    })
}
