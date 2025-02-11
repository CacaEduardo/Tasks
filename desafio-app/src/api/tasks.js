'use server'

import { api } from "@/config/api"

export const getTasks = async () => {
    try {
        const response = await api(`/tasks`, {
            method: 'GET',
        })

        if (!response.success) { 
            return []
        } 
        return response.data
    } catch (error) {
        console.error('Erro get tasks: ', error)
        return []
    }
}

export const createTask = async (task) => {
    try {
        const response = await api(`/tasks`, {
            method: 'POST',
            body: JSON.stringify({... task})
        })
        return response.success
    } catch (error) {
        console.error('Erro create tasks: ', error)
        return false
    }
}

export const editTask = async (task) => {
    const { id, ...rest } = task
    try {
        const response = await api(`/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify({... rest})
        })
        return response.success
    } catch (error) {
        console.error('Erro create tasks: ', error)
        return false
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await api(`/tasks/${id}`, {
            method: 'DELETE',
        })
        return response.success
    } catch (error) {
        console.error('Erro create tasks: ', error)
        return false
    }
}