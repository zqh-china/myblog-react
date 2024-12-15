import {createSlice} from "@reduxjs/toolkit";
import {getArticles, getAllCategories, getAllTags, getChangeLogs} from "../../services/index.js";

const globalSlice = createSlice({
    name: "global",
    initialState: {
        tagList: [],
        categoryList: [],
        articleList: [],
        changelogList: [],
        total: 0,
        page: 1,
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
    }
});
const { setTagList, setArticleList, setCategoryList, setChangelogList, setTotal, setPage } = globalSlice.actions;
// const { page } = globalSlice.getInitialState();
const fetchTagList = () => {
    return async (dispatch) => {
        const res = await getAllTags();
        dispatch(setTagList(res.data.result))
    };
}

const fetchArticleList = (page=1) => {
    return async (dispatch) => {
        const res = await getArticles(page);
        dispatch(setArticleList(res.data.result.data));
        dispatch(setTotal(res.data.result.total));
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

const reducer = globalSlice.reducer;

export default reducer;
export { fetchTagList, fetchArticleList, fetchCategoryList, fetchChangelogList, setPage }
