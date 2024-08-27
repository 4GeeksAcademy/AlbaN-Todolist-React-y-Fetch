import React, { useEffect, useState } from "react";

const Home = () => {
	const getTodosURL = "https://playground.4geeks.com/todo/users/alba";
	const addTodoURL = "https://playground.4geeks.com/todo/todos/alba";
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");

	const getTodos = () => {
		fetch(getTodosURL, {
			method: "GET",
		})
			.then((respuesta) => {
				if (!respuesta.ok) {
					crearUsuario();
				} else {
					return respuesta.json();
				}
			})
			.then((data) => {
				console.log(data);
				setTodos(data.todos);
			})
			.catch((error) => { console.error(error) });
	};

	const crearUsuario = () => {
		fetch("https://playground.4geeks.com/todo/users/alba", { method: "POST" })
			.then((respuesta) => {
				return respuesta.json()
			})
			.then(() => {
				getTodos();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const añadirTodo = () => {
		const newTodoObj = {
			label: newTodo,
			done: false
		};

		fetch(addTodoURL, {
			method: "POST",
			body: JSON.stringify(newTodoObj),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				getTodos();
				setNewTodo("");
			})
			.catch(error => { console.error(error) });
	};

	// const deleteTodo = (index) => {
	// 	const updatedTodos = todos.filter((todo, i) => i !== index);

	// 	fetch(addTodoURL, {
	// 		method: "DELETE",
	// 		body: JSON.stringify(updatedTodos),
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	})
	// 		.then((response) => response.json())
	// 		.then(() => {
	// 			setTodos(updatedTodos);
	// 		})
	// 		.catch((error) => { console.error(error); });
	// };


	async function deleteTodo(todoid) {
		const url = `https://playground.4geeks.com/todo/todos/${todoid}`
		const options = {
			method: "DELETE"
		};
		const response = await fetch(url, options);
		if (!response.ok) {
			console.log("Hubo un error", response.status, response.statusText);
		};
		getTodos();
	};

	const handleInputChange = (event) => {
		setNewTodo(event.target.value);
	};

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className="text-center justify-content-center">
			<h2 className="text-center mt-5">To Do List Alba usando React & Fetch</h2>
			<input
				type="text"
				value={newTodo}
				onChange={handleInputChange}
				placeholder="Agregar nueva tarea"
			/>
			<button className="btn mt-2" style={{ backgroundColor: "#28ADB5", color: "white" }} onClick={añadirTodo}>Agregar</button>

			<ul>
				{todos.map((todo, index) => (
					<li key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "300px", margin: "10px auto", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}>
						<span>{todo.label}</span>
						<i className="fas fa-times" style={{ color: "#28ADB5", cursor: "pointer", fontSize: "1.5em" }} onClick={() => deleteTodo(todo.id)}></i>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
