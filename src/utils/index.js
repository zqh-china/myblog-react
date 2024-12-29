import moment from 'moment';
import { Base64 } from 'js-base64';

// 格式化时间（中文）
export const formatCNDate = (date) => {
    if (!date) return '1970年01月01日 00:00';
    return moment(date).format('YYYY年MM月DD日 HH:mm');
}

// 根据当前文章信息里的tags获取 tag  tagList是整个项目所有的tag，articleTagList是该文章拥有的tag
export const getArticleTagList = (tags, tagList) => {
    if (!tags) return [];
    return tags.split(',').map(item => tagList.find(tag => tag.id === parseInt(item))).filter(item => item != null);
}
// 根据当前文章信息里的category_id获取分类
// 为什么一个元素也要返回成数组？ ——因为：1.这个函数是在JSX循环里调用的（不能在外部只调用一次就保存值），2.返回的信息中有3个信息需要用到（若用数组，可通过循环中的item取出这3个值，否则需要调用3次）
export const getArticleCategory = (category_id, categoryList) => {
    if (!category_id) return [{ name: "未分类", color: "default", id: 9999999999999 }];
    return [categoryList.find(category => category.id === category_id)];
}

// 随机生成纯数字id ——因为列表渲染时偶尔存在报错，暂时使用这个解决报错
export const generatePureNumberId = () => {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 10000); // 生成一个较小的随机数，可调整范围
    return (timestamp + randomPart).toString().slice(-10); // 取后10位，可按需调整位数
}

// Antd 颜色
export const antdColors = [
    'processing',
    'success',
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
    'warning',
    'error',
    'default',
];

// 将用户名和密码保存到localStorage
export const saveInfo2LocalStorage = (obj) => {
    localStorage.setItem('info', Base64.encode(JSON.stringify(obj)));
}

export const loadInfoFromLocalStorage = () => {
    try {
        return JSON.parse(Base64.decode(localStorage.getItem('info')));
    } catch(err) {
        return;
    }
}