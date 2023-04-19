import axios from "axios";

axios.defaults.baseURL = "http://localhost:3500/";
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';

var config = {
    headers: {
        'content-type': 'multipart/form-data',
    },
}

axios.interceptors.request.use(function (config) {
    if (localStorage.getItem('token'))
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    return config;
}, function (error) {
    return Promise.reject(error);
});


let api = {

    login: {
        login: (data) => axios.post('web/user/login', data)
    },
    blog: {
        add: (data) => axios.post('web/blog/', data),
        delete: (data) => axios.delete(`web/blog/${data}`),
        list: (data) => axios.post('web/blog/list', data),
        update: (data) => axios.patch(`web/blog/${data._id}`, data),
        comment: (data) => axios.post('web/blog/addcomment', data),
        search: (data) => axios.post('web/blog/search', data),
        upload: (data) => axios.post('web/blog/upload', data,config),
        removeImage:(data) => axios.put('web/blog/removeImage',data)
    }


}

export default api;