import React from 'react';
import styles from '../../App.module.css';
import { useAppContext } from '../AppTodoContext';

export const TodoItem = ({ todo }) => {
	const { editableTodoId, editedTodoText, deleteTodo, startEdit, saveEdit, setEditedTodoText } = useAppContext();

	return (
		<li key={todo.id}>
			{editableTodoId === todo.id ? (
				<>
					<input type="text" value={editedTodoText} onChange={(event) => setEditedTodoText(event.target.value)} className={styles.inputField} />
					<button onClick={saveEdit} className={styles.showButton}>
						Сохранить
					</button>{' '}
				</>
			) : (
				<>
					{todo.text}
					<button onClick={() => deleteTodo(todo.id)} className={styles.showButton}>
						Удалить
					</button>{' '}
					<button onClick={() => startEdit(todo.id, todo.text)} className={styles.showButton}>
						Изменить
					</button>{' '}
				</>
			)}
		</li>
	);
};
