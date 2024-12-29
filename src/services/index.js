import axios from "axios";
// const baseUrl = 'http://blog.coollt.cn';
export const baseUrl = "http://localhost:3000";
export const apiUrl = `${baseUrl}/api`;
export const imgUrl = `${baseUrl}/imgs`;

const baseHeaders = {
    'Content-Type': 'application/json'
};

const setToken =(token) => {
    if (token) {
        baseHeaders.Authorization = `Bearer ${token}`;
    }
}

export const getAllCategories = () => {
    return axios.get(`/api/category`);
}

export const getArticles = (page, size=4, publish_status='published') => {
    return axios.get(`/api/article`, { params: { publish_status, size, page } });
}

export const getArticleInfo = (id) => {
    return axios.get(`/api/article/${id}`);
}

// 根据文章id获得文章的所有段落
export const getArticleParagraphs = (id) => {
    return axios.get(`/api/paragraph/${id}`);
}

export const getChangeLogs = () => {
    return axios.get(`/api/changelog`);
}

export const updateArticle = (articleInfo, token='') => {
    if (token) {
        baseHeaders.Authorization = `Bearer ${token}`;
    }
    return axios.put(
        `/api/article`, 
        { ...articleInfo }, 
        {
            headers: baseHeaders
        }
    );
}

export const addArticle = (articleInfo, token='') => {
    if (token) {
        baseHeaders.Authorization = `Bearer ${token}`;
    }
    return axios.post(
        `/api/article`, 
        { ...articleInfo }, 
        {
            headers: baseHeaders
        }
    );
}

export const deleteArticle = (id, token='') => {
    if (token) {
        baseHeaders.Authorization = `Bearer ${token}`;
    }
    return axios.delete(
        `/api/article/${id}`,
        {
            headers: baseHeaders,
        } 
    );
}

// 图片-查删
export const getImgList = (page=1, pageSize=10, token='') => {
    setToken(token);
    return axios.get(`/api/file?page=${page}&pageSize=${pageSize}`, {headers: baseHeaders});
}

export const delImg = (id, token='') => {
    setToken(token);
    return axios.delete(`/api/file/${id}`, {headers: baseHeaders});
}


// 标签-增删改查
export const addTag = (tagInfo, token='') => {
    setToken(token);
    return axios.post(`/api/tag`, {...tagInfo}, {headers: baseHeaders});
}

export const delTag = (id, token) => {
    setToken(token);
    return axios.delete(`/api/tag/${id}`, {headers: baseHeaders});
}

export const updateTag = (tagInfo, token='') => {
    setToken(token);
    return axios.put(`/api/tag`, {...tagInfo}, {headers: baseHeaders});
}

export const getAllTags = () => {
    return axios.get(`/api/tag`);
}

// 分类-增删改查
export const addCategory = (categoryInfo, token='') => {
    setToken(token);
    return axios.post(`/api/category`, {...categoryInfo}, {headers: baseHeaders});
}

export const delCategory = (id, token='') => {
    setToken(token);
    return axios.delete(`/api/category/${id}`, {headers: baseHeaders});
}

export const updateCategory = (categoryInfo, token='') => {
    setToken(token);
    return axios.put(`/api/category`, {...categoryInfo}, {headers: baseHeaders});
}


// 获取系统日志
export const getSyslogs = (page=1, pageSize=10, token='') => {
    setToken(token);
    return axios.get(`/api/syslogs?page=${page}&pageSize=${pageSize}`, {headers: baseHeaders});
}
 
// 登录
export const login = ({ username, password }) => {
    return axios.post(`/api/auth/login`, { username, password })
}

export const getUserInfo = (token) => {
    setToken(token);
    return axios.get('/api/user/info', {headers: baseHeaders})
}


