import React from "react";
import styles from './TodoListItem.module.css';
import { FaTrashAlt } from 'react-icons/fa'; 
import { MdChecklist } from 'react-icons/md';

function TodoListItem({ item, onRemoveTodo }){

return (

    <li className={styles.ListItem}>
        <MdChecklist className={styles.ChecklistIcon} />
        {item.title}
        <button type="button"
        className={styles.RemoveButton}
        onClick={() => onRemoveTodo(item.id)}
        >
            <FaTrashAlt className={styles.TrashIcon} />
        </button>
    </li>
);
}

export default TodoListItem;
