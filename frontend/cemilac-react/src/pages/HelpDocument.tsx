import React from 'react';
import NavigationSidebar from '../components/NavigationSidebar';

const HelpDocument: React.FC = () => {
  return (
    <>
      <div className="bg-dark text-white py-2 px-4 shadow-sm border-bottom border-secondary">
        <div className="container-fluid d-flex justify-content-between font-monospace small"></div>
      </div>

      <div className="container-fluid flex-grow-1 my-4 px-md-4">
        <div className="row">
          <NavigationSidebar />
          
          <div className="col-lg-9 col-md-8 order-2">
            <div className="card shadow-sm border-0 rounded-3 mb-4">
              <div className="card-header bg-white py-3 border-bottom">
                <h5 className="mb-0 fw-bold text-dark d-flex align-items-center">
                  <i className="bi bi-file-earmark-medical text-info me-2"></i> 
                  Help Documentation
                </h5>
              </div>
              <div className="card-body text-center py-5">
                <i className="bi bi-tools text-muted fs-1 mb-3"></i>
                <h4 className="text-muted">Under Development</h4>
                <p className="text-muted">This feature is currently being implemented.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpDocument;