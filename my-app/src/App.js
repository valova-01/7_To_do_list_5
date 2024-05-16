import React from 'react';
import styles from './App.module.css';
import { TodoInput } from './components/todo-input/TodoInput';
import { TodoList } from './components/todo-list/TodoList';
import { AppProvider } from './components/AppTodoContext';

export const App = () => {
	return (
		<AppProvider>
			<AppContent />
		</AppProvider>
	);
};

const AppContent = () => {
	return (
		<div className={styles.app}>
			<h1 className={styles.title}>Список задач</h1>
			<TodoInput />
			<TodoList />
		</div>
	);
};
