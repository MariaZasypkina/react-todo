import React from "react";
import styles from './TodoListItem.module.css';
import { FaTrashAlt } from 'react-icons/fa'; 
import { MdChecklist } from 'react-icons/md';
import PropTypes from "prop-types";

TodoListItem.propTypes = {
    todo: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
  };

function TodoListItem({ todo, onRemoveTodo }){

return (

    <li className={styles.ListItem}>
        <MdChecklist className={styles.ChecklistIcon} />
        {todo.title}
        <button type="button"
        className={styles.RemoveButton}
        onClick={() => onRemoveTodo(todo.id)}
        >
            <FaTrashAlt className={styles.TrashIcon} />
        </button>
    </li>
);
}

export default TodoListItem;
