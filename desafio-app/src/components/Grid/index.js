import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Grid = ({ tasks }) => {
  return (
    <div className="container mt-5">
      <div className="row g-4"> 
        {tasks.map((task) => (
          <div key={task.id} className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Criada em:</strong> {task.created_at}</p>
                <p><strong>Atualizada em:</strong> {task.updated_at}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
