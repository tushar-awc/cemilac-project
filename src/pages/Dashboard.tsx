import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/MainLayout';
import { Project, FilterOptions } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    search: '',
    sortBy: 'default',
    sortOrder: 'desc'
  });

  // Mock project data (in real app, this would come from API)
  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: 'PROJ-DRDO-001',
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
      },
      {
        id: 'PROJ-DRDO-002',
        name: 'Unmanned Aerial Vehicle (UAV)',
        partNumber: 'UAV-PROP-904/A',
        stage: 'Integration Phase',
        status: 'Approved by Board',
        updatedAt: '1750000298',
        projectLeader: {
          name: 'Dr. Rajesh Kumar',
          designation: 'Senior Engineer',
          phone: '+91 9876543212'
        },
        dealingOfficer: {
          name: 'Shri. MN Patel',
          designation: 'Project Manager',
          phone: '+91 9876543213'
        },
        qaName: 'Govt. QA Agency',
        usrName: 'USER Services'
      },
      {
        id: 'PROJ-DRDO-003',
        name: 'Advanced Light Helicopter (ALH)',
        partNumber: 'HEL-ROTOR-441/B',
        stage: 'Certification Review',
        status: 'Approved by Board',
        updatedAt: '1750000297',
        projectLeader: {
          name: 'Smt. Priya Sharma',
          designation: 'Lead Engineer',
          phone: '+91 9876543214'
        },
        dealingOfficer: {
          name: 'Dr. SK Singh',
          designation: 'Technical Lead',
          phone: '+91 9876543215'
        },
        qaName: 'Govt. QA Agency',
        usrName: 'USER Services'
      }
    ];

    setTimeout(() => {
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort projects
  useEffect(() => {
    let result = [...projects];

    // Apply search filter
    if (filterOptions.search) {
      const searchTerm = filterOptions.search.toLowerCase();
      result = result.filter(project => 
        project.name.toLowerCase().includes(searchTerm) ||
        project.id.toLowerCase().includes(searchTerm) ||
        project.partNumber.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    if (filterOptions.sortBy && filterOptions.sortBy !== 'default') {
      result.sort((a, b) => {
        switch (filterOptions.sortBy) {
          case 'latest':
            return parseInt(b.updatedAt) - parseInt(a.updatedAt);
          case 'oldest':
            return parseInt(a.updatedAt) - parseInt(b.updatedAt);
          case 'name_asc':
            return a.name.localeCompare(b.name);
          case 'name_desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    setFilteredProjects(result);
  }, [projects, filterOptions]);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilterOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved by Board':
        return 'bg-success-subtle text-success border border-success-subtle';
      case 'Pending':
        return 'bg-warning-subtle text-warning border border-warning-subtle';
      case 'Rejected':
        return 'bg-danger-subtle text-danger border border-danger-subtle';
      default:
        return 'bg-light text-dark border';
    }
  };

  return (
    <MainLayout 
      agencyId={user?.agencyId || 'DA0000000001'} 
      agencyName={user?.agencyName || 'CEMILAC'}
    >
      <div className="card shadow-sm border-0 rounded-3 mb-4">
        <div className="card-header bg-white py-3 border-bottom">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <i className="bi bi-folder-fill text-primary me-2"></i> 
              Airworthiness Certification Tracking System
            </h5>
          </div>
          
          {/* Filter and Sort Controls */}
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-sort-down text-secondary small"></i>
              <select 
                className="form-select form-select-sm font-monospace fw-bold" 
                style={{ width: '185px' }}
                value={filterOptions.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <option value="default">Default Order</option>
                <option value="latest">Latest Updated (Newest)</option>
                <option value="oldest">Earliest Updated (Oldest)</option>
                <option value="name_asc">Name A → Z</option>
                <option value="name_desc">Name Z → A</option>
              </select>
            </div>
            <div className="d-flex align-items-center gap-2 flex-grow-1">
              <i className="bi bi-search text-secondary small"></i>
              <input 
                type="text" 
                className="form-control form-control-sm font-monospace" 
                placeholder="Search Project Name or ID..." 
                style={{ maxWidth: '280px' }}
                value={filterOptions.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle font-monospace ms-auto">
              {filteredProjects.length} Records
            </span>
          </div>
        </div>
        
        <div className="card-body p-0">
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading projects...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle mb-0 text-nowrap">
                <thead className="table-light text-secondary uppercase font-monospace small">
                  <tr>
                    <th className="ps-4" style={{ width: '60px' }}>Sr.No</th>
                    <th>ProjectId</th>
                    <th>ProjectName</th>
                    <th>Project Part Number</th>
                    <th>Project Stage</th>
                    <th className="text-center">Open Matrix</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-5">
                        <i className="bi bi-folder-x text-muted fs-1"></i>
                        <p className="text-muted mt-2 mb-0">
                          {filterOptions.search ? 'No projects match your search criteria' : 'No projects found'}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.map((project, index) => (
                      <tr key={project.id} className="paginate-row">
                        <td className="ps-4 fw-bold text-muted">{String(index + 1).padStart(2, '0')}</td>
                        <td>
                          <span className="badge bg-light text-dark border font-monospace">{project.id}</span>
                        </td>
                        <td className="fw-bold text-dark">{project.name}</td>
                        <td className="font-monospace">{project.partNumber}</td>
                        <td>
                          <span className={`badge px-2 py-1 rounded ${getStatusBadge(project.status)}`}>
                            <i className="bi bi-check-circle-fill me-1"></i> {project.status}
                          </span>
                        </td>
                        <td className="text-center">
                          <Link 
                            to={`/project-view/${project.id}?usr=1&qa=1`}
                            className="btn btn-sm btn-outline-primary px-3 rounded-2"
                          >
                            Open Matrix <i className="bi bi-chevron-right ms-1"></i>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;