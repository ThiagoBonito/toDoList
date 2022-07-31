import { useState } from 'react';
import './styles.css';
import { Trash } from 'phosphor-react';

export type Comment = {
  id: number;
  comment: string;
  isActive: boolean;
};

type ToDoItemProps = {
  comment: Comment;
  handleRemoveToDo: (id: number) => void;
};

export function ToDoItem({ comment, handleRemoveToDo }: ToDoItemProps) {
  return (
    <div className="item">
      <p className={comment.isActive ? 'item-text active' : 'item-text'}>{comment.comment}</p>
      <Trash className="item-trash" onClick={() => handleRemoveToDo(comment.id)} color="#808080" size={24} />
    </div>
  );
}
