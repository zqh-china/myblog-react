import axios from "axios";
// const baseUrl = 'http://blog.coollt.cn/api';
const baseUrl = "http://localhost:3000";
export const getAllTags = () => {
    return axios.get(`${baseUrl}/tag`);
}

export const getAllCategories = () => {
    return axios.get(`${baseUrl}/category`);
}

export const getArticles = (page, size=4, publish_status='published') => {
    return axios.get(`${baseUrl}/article`, { params: { publish_status, size, page } });
}


export const getArticleInfo = (id) => {
    return axios.get(`${baseUrl}/article/${id}`);
}

// 根据文章id获得文章的所有段落
export const getArticleParagraphs = (id) => {
    return axios.get(`${baseUrl}/paragraph/${id}`);
}

export const getChangeLogs = () => {
    return axios.get(`${baseUrl}/changelog`);
}


