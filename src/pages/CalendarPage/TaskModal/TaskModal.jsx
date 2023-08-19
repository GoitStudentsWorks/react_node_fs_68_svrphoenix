import React, { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import TaskForm from '../TaskForm/TaskForm';
import { TaskBtn } from './TaskModal.styled';

export const TaskModal = ({ status, ...props }) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const openModal = () => {
    setIsTaskModalOpen(true);
  };

  const closeModal = () => {
    setIsTaskModalOpen(false);
  };

  return (
    <>
      <TaskBtn onClick={openModal}>+ Add task</TaskBtn>
      {isTaskModalOpen && (
        <Modal onToggleModal={closeModal}>
          <TaskForm onCloseModal={closeModal} {...props} />
        </Modal>
      )}
    </>
  );
};
