import globalReducer from './modules/globalSlice.js';
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        global: globalReducer,
    }
});

export default store;