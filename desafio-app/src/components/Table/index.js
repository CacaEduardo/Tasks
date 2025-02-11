import { useState } from "react"

export const Table = ({ tasks, onDelete, handleEdit, openModal, handleStatusChange }) => {

    const [query, setQuery] = useState('')
    const removeSpecialChars = (str) => {
        return str.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase()
    }

    const dataFilter = query !== "" ? tasks.filter((task) => {
        const cleanedQuery = removeSpecialChars(query)
        const cleanedTitle = removeSpecialChars(task.title)
        const cleanedDescription = removeSpecialChars(task.description)
        const cleanedId = removeSpecialChars(task.id.toString())
    
        return (
            cleanedTitle.includes(cleanedQuery) ||
            cleanedDescription.includes(cleanedQuery) ||
            cleanedId.includes(cleanedQuery)
        )
    }) : tasks

    return(
        <div className="px-4 gap-3 d-flex flex-column">
            <div className="d-flex gap-3">
                <input type="text" className="form-control" placeholder="Pesquisa pelo título, descrição ou id da tarefa..." onChange={(e) => setQuery(e.target.value)}/>
                <button className="btn btn-dark text-nowrap btn-sm" onClick={openModal}>nova tarefa</button>
            </div>
            <div className="table-responsive">
                <table className="table bg-white rounded-3 overflow-hidden table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Título</th>
                            <th>Descrição</th>
                            <th className="text-nowrap">Criada em</th>
                            <th className="text-nowrap">Atualizada em</th>
                            <th>Status</th>
                            <th className="w-auto"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataFilter?.map((task) => (
                            <tr key={task.id}
                                className="cursor-pointer"
                                onClick={() => handleEdit(task)}
                            >
                                <td className="text-nowrap">{task.id}</td>
                                <td className="text-nowrap">{task.title}</td>
                                <td className="text-nowrap">{task.description}</td>
                                <td className="text-nowrap">{task.created_at}</td>
                                <td className="text-nowrap">{task.updated_at}</td>
                                <td className="text-nowrap">
                                    <select
                                        className="form-select form-select-sm border-0 bg-transparent"
                                        value={task.status}
                                        onClick={(e) => e.stopPropagation()} 
                                        onChange={(e) => {
                                                e.stopPropagation()
                                                const data = { ...task, status: e.target.value }
                                                handleStatusChange(data)
                                            }
                                        }
                                    >
                                        <option value="pending">Pendente</option>
                                        <option value="in_progress">Em progresso</option>
                                        <option value="completed">Concluída</option>
                                    </select>
                                </td>
                                <td className="d-flex gap-1 w-auto flex-row-reverse">
                                    <button 
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={(e) => { 
                                            e.stopPropagation()
                                            onDelete(task.id)
                                        }}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                    <button 
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={(e) => { 
                                            e.stopPropagation()
                                            handleEdit(task)
                                        }}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}