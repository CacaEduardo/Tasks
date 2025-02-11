
'use client'

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TaskModal } from "@/components/TaskModal";
import { Table } from "@/components/Table";
import { getTasks, deleteTask, editTask } from "@/api/tasks";

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [dataEditTask, setDataEditTask] = useState(null)
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const tasks = await getTasks()
      setTasks(tasks)
    } catch (e) {
      window.alert('Ocorreu um erro ao carregar tarefas')
      setTasks([])
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      const deleted = await deleteTask(id)
      if (deleted) {
        await loadTasks()
        window.alert('Tarefa removida')
      } else {
        window.alert('Erro ao tentar remover tarefa')
      }
    } catch (e) {
      window.alert('Erro ao tentar remover tarefa')
    }
  }

  const handleStatusChange = async (task) => {
    try {
      const updated = await editTask(task)
      if (updated) {
        await loadTasks()
        window.alert('Status alterado')
      } else {
        window.alert('Erro ao tentar alterar status')
      }
    } catch (e) {
      window.alert('Erro ao tentar alterar status')
    }
  }

  useEffect(() => {
    loadTasks()
  },[])

  useEffect(() => {
    if(!showModal) setDataEditTask({
      title: "",
      description: "",
      status: "Pendente",
    })
  },[showModal])

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleEdit = (task) => {
    setDataEditTask(task)
    openModal()
  }

  return (
    <div className='d-flex flex-column w-100 gap-3 min-vh-100'>
      <Header/>
      <TaskModal showModal={showModal} handleClose={closeModal} task={dataEditTask} callback={loadTasks}/>
      <Table tasks={tasks} onDelete={(id) => handleDeleteTask(id)} handleEdit={(task) => handleEdit(task)} openModal={openModal} handleStatusChange={handleStatusChange}/>
    </div>
  )
}
