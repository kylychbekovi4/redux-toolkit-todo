import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/store";
import {
	addTodo,
	editTodo,
	toggleTodoChecked,
	clearTodo,
	deleteTodo,
} from "../redux/tools/todoSlice";
import scss from "./TodoList.module.scss";
import Checkbox from "@mui/material/Checkbox";

interface Item {
	id: number;
	name: string;
	img: string;
	year: number;
	age: number;
	checked: boolean;
}

const TodoList = () => {
	const [name, setName] = useState("");
	const [img, setImg] = useState("");
	const [year, setYear] = useState(0);
	const [age, setAge] = useState(0);

	// Состояние Редактировать
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editName, setEditingName] = useState("");
	const [editImg, setEditingImg] = useState("");
	const [editYear, setEditingYear] = useState(0);
	const [editAge, setEditingAge] = useState(0);

	const dispatch = useDispatch();

	const todo = useAppSelector((state) => state.todoReducer.data);

	const startEdit = (item: Item) => {
		setEditingId(item.id);
		setEditingName(item.name);
		setEditingImg(item.img);
		setEditingYear(item.year);
		setEditingAge(item.age);
	};

	const saveEdit = () => {
		if (editingId !== null && editName && editImg && editYear && editAge) {
			dispatch(
				editTodo({
					id: editingId,
					updates: {
						name: editName,
						img: editImg,
						year: editYear,
						age: editAge,
					},
				})
			);
			setEditingId(null);
			setEditingName("");
			setEditingImg("");
			setEditingYear(0);
			setEditingAge(0);
		}
	};

	// Функция Добавление
	const handleAdd = () => {
		if (name === "" || img === "" || year === 0 || age === 0) {
			alert("Заполните все поля");
		} else {
			dispatch(
				addTodo({
					name,
					img,
					year,
					age,
					checked: false,
				})
			);
		}
		setName("");
		setImg("");
		setYear(0);
		setAge(0);
	};

	// Функция Удаление все
	const deleteAll = () => {
		dispatch(clearTodo());
	};

	// Удаления
	const handleDelete = (id: number) => {
		dispatch(deleteTodo(id));
	};

	// Чек Бокс
	const handleCheckChange = (id: number) => {
		dispatch(toggleTodoChecked(id));
	};

	// HTML
	return (
		<>
			<div className="container">
				<div className={scss.Input}>
					<TextField
						value={name}
						onChange={(e) => setName(e.target.value)}
						label="Имя пользователя"
						variant="filled"
						color="success"
						focused
					/>
					<TextField
						value={img}
						onChange={(e) => setImg(e.target.value)}
						label="Изображение"
						variant="filled"
						color="success"
						focused
					/>
					<TextField
						value={year}
						onChange={(e) => setYear(+e.target.value)}
						label="Год рождения"
						variant="filled"
						color="success"
						focused
					/>
					<TextField
						value={age}
						onChange={(e) => setAge(+e.target.value)}
						label="Возраст"
						variant="filled"
						color="success"
						focused
					/>
					<div className={scss.Button}>
						<Button onClick={handleAdd} variant="contained" color="success">
							Добавить
						</Button>
						<Button onClick={deleteAll} variant="outlined" color="error">
							Удалить все
						</Button>
					</div>
				</div>
				{/* Map Render */}
				<div className={scss.Parent}>
					{todo.map((item) => (
						<div key={item.id}>
							{editingId === item.id ? (
								<>
									<TextField
										value={editName}
										onChange={(e) => setEditingName(e.target.value)}
									/>
									<TextField
										value={editImg}
										onChange={(e) => setEditingImg(e.target.value)}
									/>
									<TextField
										value={editYear}
										onChange={(e) => setEditingYear(+e.target.value)}
									/>
									<TextField
										value={editAge}
										onChange={(e) => setEditingAge(+e.target.value)}
									/>
									<Button
										onClick={saveEdit}
										variant="contained"
										color="success">
										Сохранить
									</Button>
									<Button
										onClick={() => setEditingId(null)}
										variant="contained"
										color="success">
										Назад
									</Button>
								</>
							) : (
								<div className={scss.render}>
									<div className={scss.rendering}>
										<div className={scss.check_box}>
											<h1
												style={{
													textDecoration: item.checked
														? "line-through"
														: "none",
												}}>
												{item.name}
											</h1>
											<Checkbox
												checked={item.checked}
												onChange={() => handleCheckChange(item.id)}
												color="primary"
											/>
										</div>
										<h2>{item.year}</h2>
										<h3>{item.age}</h3>
										<img src={item.img} alt={item.name} />
										<div className={scss.buttons}>
											<Button
												onClick={() => startEdit(item)}
												variant="outlined"
												color="error">
												Редактировать
											</Button>
											<Button
												onClick={() => handleDelete(item.id)}
												variant="outlined"
												color="error">
												Удалить
											</Button>
										</div>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default TodoList;
