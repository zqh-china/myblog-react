import globalReducer from './modules/globalSlice.js';
import {configureStore} from "@reduxjs/toolkit";
import adminSlice from "./modules/adminSlice.js";

const store = configureStore({
    reducer: {
        global: globalReducer,
        admin: adminSlice,
    }
});

export default store;