import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
	id: number;
	name: string;
	img: string;
	year: number;
	age: number;
	checked: boolean;
}

interface EditTodoPayload {
	id: number;
	updates: Partial<Todo>;
}

const initialState: { data: Todo[] } = {
	data: [],
};

const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		// ! Добавление
		addTodo: (state, action: PayloadAction<Omit<Todo, "id">>) => {
			const newData: Todo = {
				id: Date.now(),
				...action.payload,
			};
			state.data.push(newData);
		},
    
		// ! Удаления все
		clearTodo: (state) => {
			state.data = [];
		},

		// ! Редактировать
		editTodo: (state, action: PayloadAction<EditTodoPayload>) => {
			const { id, updates } = action.payload;
			const index = state.data.findIndex((todo) => todo.id === id);
			if (index !== -1) {
				state.data[index] = { ...state.data[index], ...updates };
			}
		},

		// ! Удаление
		deleteTodo: (state, action: PayloadAction<number>) => {
			state.data = state.data.filter((todo) => todo.id !== action.payload);
		},

		// ! Check Box
		toggleTodoChecked: (state, action) => {
			const index = state.data.findIndex((item) => item.id === action.payload);
			if (index !== -1) {
				state.data[index].checked = !state.data[index].checked;
			}
		},
	},
});

export const { addTodo, clearTodo, editTodo, deleteTodo, toggleTodoChecked } =
	todoSlice.actions;
export const todoReducer = todoSlice.reducer;
