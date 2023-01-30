import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./reducers";

export default configureStore({
    reducer: {
        todo: TodoReducer,
    },
});