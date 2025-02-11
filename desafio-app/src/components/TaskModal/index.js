import { useState, useEffect } from "react";
import { createTask, editTask } from "@/api/tasks";

export const TaskModal = ({ showModal, handleClose, callback, task }) => {
    const [ loading, setLoading ] = useState(false)
    const initialState = {
      title: "",
      description: "",
      status: "Pendente",
    };
    const [dataTask, setDataTask] = useState(initialState)

    useEffect(() => {
      setDataTask(task)
    },[task])

    useEffect(() => {
      if (!showModal) setDataTask(initialState)
    },[showModal])
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setDataTask({ ...dataTask, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true)
        if (dataTask?.id) {
          var created = await editTask(dataTask)
        } else {
          var created = await createTask(dataTask)
        }

        if (created) {
          window.alert(dataTask?.id ? 'Tarefa editada com sucesso': 'Tarefa adicionada com sucesso')
          handleClose()
          callback()
        } else {
          window.alert('Ocorreu um erro, tente novamente em instantes')
        }
      } catch (e) {
        window.alert('Ocorreu um erro, tente novamente em instantes')
      } finally {
        setLoading(false)
      }
    };
  
    return (
      <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{dataTask?.id ? 'Editar tarefa' : 'Nova tarefa'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={dataTask?.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Descrição</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={dataTask?.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={dataTask?.status}
                    onChange={handleChange}
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluída">Concluída</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-dark" onClick={handleClose}>Fechar</button>
                <button type="submit" className="btn btn-dark">
                  {loading ? 
                  <>
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </> 
                  : dataTask?.id ? 'Alterar tarefa': 'Adicionar tarefa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };