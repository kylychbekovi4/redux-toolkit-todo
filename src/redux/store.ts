import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { todoReducer } from "./tools/todoSlice";

export const store = configureStore({
	reducer: {
		todoReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type useDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;