import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { Project, ApplicabilityMatrixItem } from '../types';

const ProjectView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [matrixItems, setMatrixItems] = useState<ApplicabilityMatrixItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [uploadModal, setUploadModal] = useState<{ show: boolean; itemId: string; documentName: string }>({
    show: false,
    itemId: '',
    documentName: ''
  });

  // Mock project data
  useEffect(() => {
    const mockProject: Project = {
      id: id || 'PROJ-DRDO-001',
      name: 'Light Combat Aircraft (LCA)',
      partNumber: 'LCA-WG-7712/REV3',
      stage: 'Final Testing',
      status: 'Approved by Board',
      updatedAt: '1750000299',
      projectLeader: {
        name: 'Shri. AB Roy',
        designation: 'Chief Scientist',
        phone: '+91 9876543210'
      },
      dealingOfficer: {
        name: 'Smt. DC Choudhry',
        designation: 'Technical Officer',
        phone: '+91 9876543211'
      },
      qaName: 'Govt. QA Agency',
      usrName: 'USER Services'
    };

    const mockMatrixItems: ApplicabilityMatrixItem[] = [
      {
        id: '1',
        srNo: 1,
        documentName: 'Functional Hazard Analysis',
        applicability: 'Applicable',
        status: 'Rejected',
        submittedFile: 'FHA_v1.0.pdf',
        remarks: 'Re-upload required with updated safety parameters'
      },
      {
        id: '2',
        srNo: 2,
        documentName: 'FMECA',
        applicability: 'Applicable',
        status: 'Approved',
        submittedFile: 'FMECA_Final.pdf',
        remarks: 'Document approved'
      },
      {
        id: '3',
        srNo: 3,
        documentName: 'Reliability Analysis',
        applicability: 'Applicable',
        status: 'Pending',
        remarks: 'Awaiting submission'
      },
      {
        id: '4',
        srNo: 4,
        documentName: 'Preliminary Design Document',
        applicability: 'Applicable',
        status: 'Pending',
        remarks: 'Not yet submitted'
      },
      {
        id: '5',
        srNo: 5,
        documentName: 'Technical Specification',
        applicability: 'Applicable',
        status: 'Pending',
        remarks: 'Under review'
      },
      {
        id: '6',
        srNo: 6,
        documentName: 'Functional Test Plan',
        applicability: 'Applicable',
        status: 'Pending',
        remarks: 'Awaiting submission'
      }
    ];

    setTimeout(() => {
      setProject(mockProject);
      setMatrixItems(mockMatrixItems);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-success text-uppercase px-2 py-1';
      case 'Rejected':
        return 'bg-danger text-uppercase px-2 py-1';
      case 'Pending':
        return 'bg-warning text-dark text-uppercase px-2 py-1';
      default:
        return 'bg-secondary text-uppercase px-2 py-1';
    }
  };

  const getUSRQAButtonClass = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'btn-success text-white';
      case 'Rejected':
        return 'btn-danger text-white';
      case 'Pending':
        return 'btn-primary text-white';
      default:
        return 'btn-secondary text-white';
    }
  };

  const openUploadModal = (itemId: string, documentName: string) => {
    setUploadModal({ show: true, itemId, documentName });
  };

  const closeUploadModal = () => {
    setUploadModal({ show: false, itemId: '', documentName: '' });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file upload
      console.log('Uploading file:', file.name);
      closeUploadModal();
      
      // Update the matrix item status
      setMatrixItems(prev => 
        prev.map(item => 
          item.id === uploadModal.itemId 
            ? { ...item, status: 'Pending', submittedFile: file.name }
            : item
        )
      );
    }
  };

  const downloadObservation = (itemId: string) => {
    // Simulate observation download
    console.log('Downloading observation for item:', itemId);
    // In real app, this would trigger file download
  };

  const openChatPanel = () => {
    // Simulate opening chat panel
    console.log('Opening chat panel for project communication');
  };

  const downloadCertificate = () => {
    // Simulate certificate download
    window.open('/certificate', '_blank');
  };

  if (isLoading || !project) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading project details...</p>
        </div>
      </div>
    );
  }

  return (
    <MainLayout showIdentityRibbon={false}>
      {/* Project Overview Card */}
      <div className="card shadow-sm border-0 rounded-3 mb-4 bg-white position-relative">
              <button 
                type="button" 
                className="btn btn-outline-primary btn-sm position-absolute top-0 end-0 m-2 font-monospace fw-bold rounded-pill"
                onClick={() => setShowTeamModal(true)}
              >
                <i className="bi bi-info-circle-fill me-1"></i> View Details
              </button>
              <div className="card-body p-3 mt-4 mt-md-0">
                <div className="row g-3 text-center text-md-start">
                  <div className="col-md-2 border-md-end">
                    <div className="small text-muted text-uppercase tracking-wider font-monospace" style={{ fontSize: '0.7rem' }}>
                      Oversight Center
                    </div>
                    <h6 className="fw-bold text-dark mb-0 mt-1">
                      <i className="bi bi-building-fill text-primary me-2"></i>RCMA Software
                    </h6>
                  </div>
                  <div className="col-md-2 border-md-end">
                    <div className="small text-muted text-uppercase tracking-wider font-monospace" style={{ fontSize: '0.7rem' }}>
                      Project Leader (PL)
                    </div>
                    <h6 className="fw-bold text-dark mb-0 mt-1">
                      <i className="bi bi-person-badge-fill text-info me-2"></i>{project.projectLeader?.name}
                    </h6>
                    <div className="text-success font-monospace small fw-bold mt-1">
                      <i className="bi bi-telephone-fill me-1"></i>{project.projectLeader?.phone}
                    </div>
                  </div>
                  <div className="col-md-2 border-md-end">
                    <div className="small text-muted text-uppercase tracking-wider font-monospace" style={{ fontSize: '0.7rem' }}>
                      Dealing Officer (DO)
                    </div>
                    <h6 className="fw-bold text-dark mb-0 mt-1">
                      <i className="bi bi-person-workspace text-secondary me-2"></i>{project.dealingOfficer?.name}
                    </h6>
                    <div className="text-success font-monospace small fw-bold mt-1">
                      <i className="bi bi-telephone-fill me-1"></i>{project.dealingOfficer?.phone}
                    </div>
                  </div>
                  <div className="col-md-2 border-md-end">
                    <div className="small text-muted text-uppercase tracking-wider font-monospace" style={{ fontSize: '0.7rem' }}>
                      QA Name
                    </div>
                    <h6 className="fw-bold text-dark mb-0 mt-1">
                      <i className="bi bi-ui-checks text-success me-2"></i>{project.qaName}
                    </h6>
                  </div>
                  <div className="col-md-2 border-md-end">
                    <div className="small text-muted text-uppercase tracking-wider font-monospace" style={{ fontSize: '0.7rem' }}>
                      USR Name
                    </div>
                    <h6 className="fw-bold text-dark mb-0 mt-1">
                      <i className="bi bi-person-fill text-info me-2"></i>{project.usrName}
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            {/* Applicability Matrix Card */}
            <div className="card shadow-sm border-0 rounded-3 mb-4">
              <div className="card-header bg-white py-3 border-bottom d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div className="d-flex align-items-center gap-3">
                  <h5 className="mb-0 fw-bold text-dark d-flex align-items-center">
                    <i className="bi bi-file-earmark-check-fill text-primary me-2"></i> 
                    Applicability Matrix Document Status Tracker
                  </h5>
                  <button className="btn btn-sm px-4 font-monospace fw-bold text-secondary bg-light border" disabled>
                    Iteration 1
                  </button>
                </div>
                
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-sm btn-outline-primary px-3 rounded-2 fw-semibold"
                    onClick={openChatPanel}
                  >
                    <i className="bi bi-chat-dots-fill me-1"></i> Conversation
                  </button>
                  <button 
                    className="btn btn-sm btn-success px-3 rounded-2 fw-semibold"
                    onClick={downloadCertificate}
                  >
                    <i className="bi bi-patch-check-fill me-1"></i> Download Certificate
                  </button>
                  <Link to="/dashboard" className="btn btn-sm btn-outline-secondary px-3 rounded-2">
                    <i className="bi bi-arrow-left-short fs-6 align-middle"></i> Back
                  </Link>
                </div>
              </div>

              {/* Project Info Bar */}
              <div className="card-header bg-white py-2 border-bottom d-flex flex-wrap gap-4 align-items-center font-monospace small">
                <div><span className="text-muted">Project Id:</span> <strong className="text-dark">{project.id}</strong></div>
                <div><span className="text-muted">Project Name:</span> <strong className="text-dark">{project.name}</strong></div>
                <div><span className="text-muted">QA Name:</span> <strong className="text-dark">{project.qaName}</strong></div>
                <div><span className="text-muted">USR Name:</span> <strong className="text-dark">{project.usrName}</strong></div>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-sm table-hover align-middle mb-0 workspace-table" style={{ width: '100%', tableLayout: 'fixed' }}>
                    <thead className="table-light border-bottom">
                      <tr>
                        <th className="ps-3" style={{ width: '55px' }}>Sr No.</th>
                        <th style={{ width: '45%' }}>Document Name</th>
                        <th style={{ width: '120px' }}>Status</th>
                        <th className="text-center" style={{ width: '130px' }}>Action Workspace</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matrixItems.map((item) => (
                        <tr key={item.id} id={`row_layout_${item.id}`}>
                          <td className="ps-4 fw-bold text-muted">{item.srNo}</td>
                          <td>
                            <div className="fw-semibold text-dark d-flex align-items-center gap-2">
                              {item.status === 'Rejected' && (
                                <span className="badge bg-danger pulse-obs" style={{ fontSize: '0.65rem' }}>
                                  <i className="bi bi-exclamation-circle-fill me-1"></i>OBS
                                </span>
                              )}
                              {item.documentName}
                            </div>
                            {item.submittedFile && (
                              <div className="small text-primary font-monospace mt-1">
                                <div className="d-block text-truncate mb-1">
                                  <i className="bi bi-file-earmark-check-fill text-success"></i> {item.submittedFile}
                                </div>
                                <div className="text-muted fw-normal" style={{ fontSize: '0.72rem' }}>
                                  <i className="bi bi-clock-history"></i> Uploaded: 24/06/2026 10:30:00
                                </div>
                              </div>
                            )}
                          </td>
                          <td>
                            <span className={`badge matrix-status ${getStatusBadge(item.status)}`}>
                              {item.status === 'Rejected' ? 'Re-Upload' : item.status}
                            </span>
                          </td>
                          <td className="text-center">
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              <button 
                                className={`btn btn-sm fw-bold ${getUSRQAButtonClass(item.status)}`}
                                style={{ fontSize: '0.75rem' }}
                                title={`USR Request: ${item.status}`}
                              >
                                USR
                              </button>
                              <button 
                                className={`btn btn-sm fw-bold ${getUSRQAButtonClass(item.status)}`}
                                style={{ fontSize: '0.75rem' }}
                                title={`QA Request: ${item.status}`}
                              >
                                QA
                              </button>
                              <button 
                                className="btn btn-sm btn-light border"
                                onClick={() => openUploadModal(item.id, item.documentName)}
                                title="Upload Document"
                              >
                                <i className="bi bi-paperclip fs-5 text-secondary"></i>
                              </button>
                              <button 
                                className={`btn btn-sm border position-relative ${
                                  item.status === 'Rejected' ? 'btn-warning' : 'btn-light'
                                }`}
                                onClick={() => downloadObservation(item.id)}
                                title="Download CEMILAC Observation"
                              >
                                <i className={`bi bi-cloud-arrow-down-fill fs-5 ${
                                  item.status === 'Rejected' ? 'text-dark' : 'text-secondary'
                                }`}></i>
                                {item.status === 'Rejected' && (
                                  <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                                    <span className="visually-hidden">Observation pending</span>
                                  </span>
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

      {/* Team Details Modal */}
      {showTeamModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header bg-primary border-0 py-3">
                <h5 className="modal-title text-white fw-bold font-monospace d-flex align-items-center" style={{ fontSize: '1.1rem' }}>
                  <i className="bi bi-people-fill me-2 text-white-50"></i> Project Team Details
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white"
                  onClick={() => setShowTeamModal(false)}
                ></button>
              </div>
              <div className="modal-body p-4 bg-light">
                <div className="mb-4">
                  <div className="small text-muted text-uppercase tracking-wider font-monospace mb-2 fw-bold" style={{ fontSize: '0.75rem' }}>
                    Project Leader (PL)
                  </div>
                  <div className="card border-0 shadow-sm rounded-3">
                    <div className="card-body p-3 d-flex align-items-center gap-3">
                      <div className="bg-info bg-opacity-10 p-3 rounded-circle text-info fs-4 d-flex align-items-center justify-content-center" style={{ width: '55px', height: '55px' }}>
                        <i className="bi bi-person-badge-fill"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark mb-1 fs-6">{project.projectLeader?.name}</h6>
                        <div className="text-secondary small mb-1 fw-medium">{project.projectLeader?.designation}</div>
                        <div className="text-success font-monospace small fw-bold">
                          <i className="bi bi-telephone-fill me-1"></i>{project.projectLeader?.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="small text-muted text-uppercase tracking-wider font-monospace mb-2 fw-bold" style={{ fontSize: '0.75rem' }}>
                    Dealing Officers (DO)
                  </div>
                  <div className="card border-0 shadow-sm rounded-3">
                    <div className="card-body p-3 d-flex align-items-center gap-3">
                      <div className="bg-secondary bg-opacity-10 p-3 rounded-circle text-secondary fs-4 d-flex align-items-center justify-content-center" style={{ width: '55px', height: '55px' }}>
                        <i className="bi bi-person-workspace"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark mb-1">{project.dealingOfficer?.name}</h6>
                        <div className="text-secondary small mb-1 fw-medium">{project.dealingOfficer?.designation}</div>
                        <div className="text-success font-monospace small fw-bold">
                          <i className="bi bi-telephone-fill me-1"></i>{project.dealingOfficer?.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {uploadModal.show && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Document: {uploadModal.documentName}</h5>
                <button type="button" className="btn-close" onClick={closeUploadModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="fileInput" className="form-label">Select file to upload</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    id="fileInput"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                  />
                  <div className="form-text">Maximum file size: 500 MB</div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeUploadModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ProjectView;