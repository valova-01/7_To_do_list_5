import React, { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
	return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [sortByAlphabet, setSortByAlphabet] = useState(false);
	const [sortedTodos, setSortedTodos] = useState([]);
	const [editableTodoId, setEditableTodoId] = useState(null);
	const [editedTodoText, setEditedTodoText] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:3005/todos');
				if (!response.ok) {
					throw new Error(`Ошибка положения дела: ${response.status}`);
				}
				const data = await response.json();
				setTodos(data);
			} catch (error) {
				console.error('Ошибка данных:', error.message);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (sortByAlphabet) {
			const sorted = [...todos].sort((a, b) => a.text.localeCompare(b.text));
			setSortedTodos(sorted);
		} else {
			setSortedTodos([...todos]);
		}
	}, [sortByAlphabet, todos]);

	const addTodo = async () => {
		try {
			const response = await fetch('http://localhost:3005/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify({ text: newTodo }),
			});

			if (!response.ok) {
				throw new Error(`Ошибка положения дела: ${response.status}`);
			}

			const data = await response.json();
			setTodos([...todos, data]);
			setNewTodo('');
		} catch (error) {
			console.error('Ошибка удаления задачи:', error.message);
		}
	};

	const deleteTodo = async (id) => {
		try {
			const response = await fetch(`http://localhost:3005/todos/${id}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				const updatedTodos = todos.filter((todo) => todo.id !== id);
				setTodos(updatedTodos);
			}
		} catch (error) {
			console.error('Ошибка удаления дела:', error.message);
		}
	};

	const handleSearch = async () => {
		try {
			const response = await fetch(`http://localhost:3005/todos?q=${searchTerm}`);

			if (!response.ok) {
				throw new Error(`Ошибка положение дел: ${response.status}`);
			}

			const data = await response.json();
			setTodos(data);
		} catch (error) {
			console.error('Ошибка поиска:', error.message);
		}
	};

	const startEdit = (id, text) => {
		setEditableTodoId(id);
		setEditedTodoText(text);
	};

	const saveEdit = async () => {
		try {
			const response = await fetch(`http://localhost:3005/todos/${editableTodoId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify({ text: editedTodoText }),
			});

			if (response.ok) {
				const updatedTodos = todos.map((todo) => (todo.id === editableTodoId ? { ...todo, text: editedTodoText } : todo));
				setTodos(updatedTodos);
				setEditableTodoId(null);
				setEditedTodoText('');
			}
		} catch (error) {
			console.error('Ошибка сохранения:', error.message);
		}
	};

	const contextValue = {
		todos,
		newTodo,
		searchTerm,
		sortByAlphabet,
		sortedTodos,
		editableTodoId,
		editedTodoText,
		setNewTodo,
		setSearchTerm,
		setSortByAlphabet,
		addTodo,
		deleteTodo,
		handleSearch,
		startEdit,
		saveEdit,
		setEditedTodoText,
	};

	return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
