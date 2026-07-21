import React from 'react';

const Certificate: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container-fluid flex-grow-1 p-4">
        <div className="card shadow-lg border-0 rounded-3">
          <div className="card-header bg-white py-3 border-bottom text-center">
            <h5 className="mb-0 fw-bold text-dark d-flex align-items-center justify-content-center">
              <i className="bi bi-patch-check-fill text-success me-2"></i> 
              Certificate Generation
            </h5>
          </div>
          <div className="card-body text-center py-5">
            <i className="bi bi-tools text-muted fs-1 mb-3"></i>
            <h4 className="text-muted">Under Development</h4>
            <p className="text-muted">Certificate generation feature is currently being implemented.</p>
            <button className="btn btn-secondary" onClick={() => window.close()}>
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;