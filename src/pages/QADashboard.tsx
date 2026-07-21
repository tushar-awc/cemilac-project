import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/MainLayout';
import { Project } from '../types';

const QADashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock project data for QA view
  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: 'PROJ-DRDO-001',
        name: 'Light Combat Aircraft (LCA)',
        partNumber: 'LCA-WG-7712/REV3',
        stage: 'QA Review Phase',
        status: 'Approved by Board',
        updatedAt: '1750000299',
        qaName: 'Govt. QA Agency',
        usrName: 'USER Services'
      },
      {
        id: 'PROJ-DRDO-002',
        name: 'Unmanned Aerial Vehicle (UAV)',
        partNumber: 'UAV-PROP-904/A',
        stage: 'QA Testing',
        status: 'Approved by Board',
        updatedAt: '1750000298',
        qaName: 'Govt. QA Agency',
        usrName: 'USER Services'
      },
      {
        id: 'PROJ-DRDO-003',
        name: 'Advanced Light Helicopter (ALH)',
        partNumber: 'HEL-ROTOR-441/B',
        stage: 'QA Documentation Review',
        status: 'Approved by Board',
        updatedAt: '1750000297',
        qaName: 'Govt. QA Agency',
        usrName: 'USER Services'
      }
    ];

    setTimeout(() => {
      setProjects(mockProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <MainLayout 
      agencyId={user?.agencyId || 'QA0000000001'} 
      agencyName={user?.agencyName || 'Quality Assurance Agency'}
    >
      <div className="card shadow-sm border-0 rounded-3 mb-4">
              <div className="card-header bg-white py-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold text-dark d-flex align-items-center">
                    <i className="bi bi-shield-check-fill text-success me-2"></i> 
                    QA Project Review Dashboard
                  </h5>
                  <div className="d-flex gap-2">
                    <span className="badge bg-success-subtle text-success px-3 py-2">
                      <i className="bi bi-person-check-fill me-1"></i>
                      Quality Assurance
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="card-body p-0">
                {isLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-success" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading QA projects...</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle mb-0 text-nowrap">
                      <thead className="table-light text-secondary uppercase font-monospace small">
                        <tr>
                          <th className="ps-4" style={{ width: '60px' }}>Sr.No</th>
                          <th>Project ID</th>
                          <th>Project Name</th>
                          <th>QA Stage</th>
                          <th>Status</th>
                          <th className="text-center">QA Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((project, index) => (
                          <tr key={project.id} className="paginate-row">
                            <td className="ps-4 fw-bold text-muted">{String(index + 1).padStart(2, '0')}</td>
                            <td>
                              <span className="badge bg-light text-dark border font-monospace">{project.id}</span>
                            </td>
                            <td className="fw-bold text-dark">{project.name}</td>
                            <td className="text-primary fw-semibold">{project.stage}</td>
                            <td>
                              <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 rounded">
                                <i className="bi bi-check-circle-fill me-1"></i> {project.status}
                              </span>
                            </td>
                            <td className="text-center">
                              <div className="d-flex gap-1 justify-content-center">
                                <Link 
                                  to={`/qa-project-view/${project.id}`}
                                  className="btn btn-sm btn-outline-primary px-2 rounded-2"
                                  title="Review Project"
                                >
                                  <i className="bi bi-eye"></i>
                                </Link>
                                <button 
                                  className="btn btn-sm btn-outline-success px-2 rounded-2"
                                  title="Approve"
                                >
                                  <i className="bi bi-check-lg"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-warning px-2 rounded-2"
                                  title="Request Changes"
                                >
                                  <i className="bi bi-exclamation-triangle"></i>
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

            {/* QA Statistics Cards */}
            <div className="row mb-4">
              <div className="col-md-3 mb-3">
                <div className="card border-0 shadow-sm bg-success-subtle">
                  <div className="card-body text-center py-4">
                    <i className="bi bi-check-circle-fill text-success fs-1 mb-2"></i>
                    <h4 className="fw-bold text-success mb-1">24</h4>
                    <p className="text-success mb-0 small fw-semibold">Approved Projects</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card border-0 shadow-sm bg-warning-subtle">
                  <div className="card-body text-center py-4">
                    <i className="bi bi-clock-fill text-warning fs-1 mb-2"></i>
                    <h4 className="fw-bold text-warning mb-1">8</h4>
                    <p className="text-warning mb-0 small fw-semibold">Under Review</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card border-0 shadow-sm bg-info-subtle">
                  <div className="card-body text-center py-4">
                    <i className="bi bi-file-earmark-check-fill text-info fs-1 mb-2"></i>
                    <h4 className="fw-bold text-info mb-1">142</h4>
                    <p className="text-info mb-0 small fw-semibold">Documents Reviewed</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card border-0 shadow-sm bg-primary-subtle">
                  <div className="card-body text-center py-4">
                    <i className="bi bi-graph-up-arrow text-primary fs-1 mb-2"></i>
                    <h4 className="fw-bold text-primary mb-1">96%</h4>
                    <p className="text-primary mb-0 small fw-semibold">Compliance Rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent QA Activities */}
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-header bg-white py-3 border-bottom">
                <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
                  <i className="bi bi-clock-history text-primary me-2"></i>
                  Recent QA Activities
                </h6>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  <div className="list-group-item d-flex justify-content-between align-items-start border-0 px-0">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Document Review Completed</div>
                      <small className="text-muted">LCA Project - Applicability Matrix approved</small>
                    </div>
                    <small className="text-muted">2 hours ago</small>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-start border-0 px-0">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Certification Request Processed</div>
                      <small className="text-muted">UAV Project - Safety requirements verified</small>
                    </div>
                    <small className="text-muted">4 hours ago</small>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-start border-0 px-0">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Compliance Check Initiated</div>
                      <small className="text-muted">ALH Project - Technical documentation review started</small>
                    </div>
                    <small className="text-muted">6 hours ago</small>
                  </div>
                </div>
              </div>
            </div>
    </MainLayout>
  );
};

export default QADashboard;