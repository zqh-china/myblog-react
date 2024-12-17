import {createSlice} from "@reduxjs/toolkit";
import {
    getArticles,
    getAllCategories,
    getAllTags,
    getChangeLogs,
    getArticleInfo,
    getArticleParagraphs
} from "../../services/index.js";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        tagList: [],
        categoryList: [],
        articleList: [],
        changelogList: [],
        total: 0,
        page: 1,
        articleInfo: [],
        paragraphList: [],
    },
    reducers: {
        setTagList: (state, action) => {
            state.tagList = action.payload;
        },
        setCategoryList: (state, action) => {
            state.categoryList = action.payload;
        },
        setArticleList: (state, action) => {
            state.articleList = action.payload;
        },
        setChangelogList: (state, action) => {
            state.changelogList = action.payload;
        },
        setTotal: (state, action) => {
            state.total = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setArticleInfo: (state, action) => {
            state.articleInfo = action.payload;
        },
        setParagraphList: (state, action) => {
            state.paragraphList = action.payload;
        }
    }
});
const {
    setTagList,
    setArticleList,
    setCategoryList,
    setChangelogList,
    setTotal,
    setPage,
    setParagraphList,
    setArticleInfo,
} = adminSlice.actions;
// const { page } = globalSlice.getInitialState();
const fetchTagList = () => {
    return async (dispatch) => {
        const res = await getAllTags();
        dispatch(setTagList(res.data.result))
    };
}
// 获取所有文章
const fetchArticleList = (page=1) => {
    return async (dispatch) => {
        const res = await getArticles(page, 10, 'all_');
        dispatch(setArticleList(res.data.result.data));
        dispatch(setTotal(res.data.result.total));
    }
}

const fetchArticleInfo = (articleId) => {
    return async (dispatch) => {
        const res = await getArticleInfo(articleId);
        dispatch(setArticleInfo(res.data.result));
    }
}

const fetchParagraphList = (articleId) => {
    return async (dispatch) => {
        const res = await getArticleParagraphs(articleId);
        dispatch(setParagraphList(res.data.result));
    }
}

const fetchCategoryList = () => {
    return async (dispatch) => {
        const res = await getAllCategories();
        dispatch(setCategoryList(res.data.result));
    }
}

const fetchChangelogList = () => {
    return async (dispatch) => {
        const res = await getChangeLogs();
        dispatch(setChangelogList(res.data.result));
    }
}

const reducer = adminSlice.reducer;

export default reducer;
export { fetchTagList, fetchArticleList, fetchCategoryList, fetchChangelogList, setPage, fetchArticleInfo, fetchParagraphList }
