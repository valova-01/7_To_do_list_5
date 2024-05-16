import React from 'react';
import styles from '../../App.module.css';
import { TodoItem } from '../todo-item/TodoItem';
import { useAppContext } from '../AppTodoContext';

export const TodoList = () => {
	const { sortedTodos, editableTodoId, editedTodoText, deleteTodo, startEdit, saveEdit, setEditedTodoText } = useAppContext();

	return Array.isArray(sortedTodos) ? (
		<ul className={styles.todoList}>
			{sortedTodos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					editableTodoId={editableTodoId}
					editedTodoText={editedTodoText}
					deleteTodo={deleteTodo}
					startEdit={startEdit}
					saveEdit={saveEdit}
					setEditedTodoText={setEditedTodoText}
				/>
			))}
		</ul>
	) : null;
};
