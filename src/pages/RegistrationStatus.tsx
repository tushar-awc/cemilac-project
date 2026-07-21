import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationSidebar from '../components/NavigationSidebar';
import { Registration } from '../types';

const RegistrationStatus: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock registration data
    const mockRegistrations: Registration[] = [
      {
        id: 'REG-001',
        projectName: 'Light Combat Aircraft (LCA)',
        projectType: 'Avionics System',
        description: 'Advanced flight control system for LCA aircraft',
        status: 'Approved',
        submittedDate: '2024-06-15',
        documents: []
      },
      {
        id: 'REG-002',
        projectName: 'Unmanned Aerial Vehicle',
        projectType: 'Navigation System',
        description: 'GPS-based navigation system for UAV operations',
        status: 'Under Review',
        submittedDate: '2024-06-20',
        documents: []
      },
      {
        id: 'REG-003',
        projectName: 'Advanced Light Helicopter',
        projectType: 'Safety System',
        description: 'Emergency response and safety management system',
        status: 'Draft',
        submittedDate: '2024-06-25',
        documents: []
      }
    ];

    setTimeout(() => {
      setRegistrations(mockRegistrations);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-success text-white';
      case 'Under Review':
        return 'bg-warning text-dark';
      case 'Rejected':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

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
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold text-dark d-flex align-items-center">
                    <i className="bi bi-activity text-warning me-2"></i> 
                    Registration Status Tracker
                  </h5>
                  <Link to="/new-registration" className="btn btn-primary btn-sm">
                    <i className="bi bi-plus-lg me-1"></i> New Registration
                  </Link>
                </div>
              </div>
              
              <div className="card-body p-0">
                {isLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading registration status...</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Registration ID</th>
                          <th>Project Name</th>
                          <th>Type</th>
                          <th>Status</th>
                          <th>Submitted Date</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registrations.map((registration) => (
                          <tr key={registration.id}>
                            <td className="font-monospace">{registration.id}</td>
                            <td className="fw-semibold">{registration.projectName}</td>
                            <td>{registration.projectType}</td>
                            <td>
                              <span className={`badge ${getStatusBadge(registration.status)} px-2 py-1`}>
                                {registration.status}
                              </span>
                            </td>
                            <td>{registration.submittedDate}</td>
                            <td className="text-center">
                              <div className="btn-group btn-group-sm">
                                <button className="btn btn-outline-primary" title="View Details">
                                  <i className="bi bi-eye"></i>
                                </button>
                                <button className="btn btn-outline-secondary" title="Download">
                                  <i className="bi bi-download"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationStatus;