import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavigationSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActiveRoute = (path: string): boolean => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <div className="card shadow-sm border-0 bg-white rounded-3">
      <div className="card-header bg-white py-3 border-bottom">
        <div className="text-center">
          <h6 className="mb-0 fw-bold text-secondary tracking-wider font-monospace text-uppercase" style={{ whiteSpace: 'nowrap' }}>
            Navigation Menu
          </h6>
        </div>
      </div>
        <div className="card-body p-2">
          <div className="list-group list-group-flush border-0 custom-menu-list">
            
            {/* Registered Projects */}
            <Link 
              to="/dashboard" 
              className={`list-group-item list-group-item-action py-3 px-3 d-flex align-items-center mb-1 ${
                isActiveRoute('/dashboard') 
                  ? 'active border-0 rounded-2 shadow-sm text-white'
                  : 'text-dark text-opacity-75 border-0 rounded-2'
              }`}
              style={isActiveRoute('/dashboard') ? { backgroundColor: 'var(--drdo-blue)' } : {}}
            >
              <i className={`bi bi-layers-half me-3 fs-5 ${isActiveRoute('/dashboard') ? 'text-white' : 'text-primary'}`}></i>
              <span className="fw-semibold">Registered Projects</span>
            </Link>

            {/* My Registrations Hierarchy */}
            <div className="list-group-item border-0 p-0 mb-1 bg-transparent">
              <button
                className="list-group-item list-group-item-action border-0 rounded-2 py-3 px-3 d-flex align-items-center text-dark text-opacity-75 w-100 text-start"
                onClick={() => toggleMenu('myRegistrations')}
                type="button"
              >
                <i className="bi bi-folder-fill me-3 fs-5 text-primary"></i>
                <span className="fw-semibold">My Registrations</span>
                <i className={`bi bi-chevron-${expandedMenus.includes('myRegistrations') ? 'up' : 'down'} ms-auto small transition-transform`}></i>
              </button>
              <div className={`collapse ${expandedMenus.includes('myRegistrations') ? 'show' : ''}`}>
                <div className="ps-4 pe-2 py-1">
                  <Link
                    to="/new-registration"
                    className={`list-group-item list-group-item-action border-0 rounded-2 py-2 px-3 d-flex align-items-center mb-1 ${
                      isActiveRoute('/new-registration') ? 'bg-light' : 'text-dark text-opacity-75'
                    }`}
                  >
                    <i className="bi bi-plus-lg me-3 fs-6 text-success"></i>
                    <span className="fw-semibold small">New Registration</span>
                  </Link>
                  <Link
                    to="/registration-status"
                    className={`list-group-item list-group-item-action border-0 rounded-2 py-2 px-3 d-flex align-items-center mb-1 ${
                      isActiveRoute('/registration-status') ? 'bg-light' : 'text-dark text-opacity-75'
                    }`}
                  >
                    <i className="bi bi-activity me-3 fs-6 text-warning"></i>
                    <span className="fw-semibold small">Status</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Raised Requests */}
            <Link
              to="/raised-requests"
              className={`list-group-item list-group-item-action border-0 rounded-2 py-3 px-3 d-flex align-items-center mb-1 ${
                isActiveRoute('/raised-requests') ? 'bg-light' : 'text-dark text-opacity-75'
              }`}
            >
              <i className="bi bi-card-checklist me-3 fs-5 text-warning"></i>
              <span className="fw-semibold">Raised Requests</span>
            </Link>

            {/* Service Certificate Hierarchy */}
            <div className="list-group-item border-0 p-0 mb-1 bg-transparent">
              <button
                className="list-group-item list-group-item-action border-0 rounded-2 py-3 px-3 d-flex align-items-center text-dark text-opacity-75 w-100 text-start"
                onClick={() => toggleMenu('serviceCertificate')}
                type="button"
              >
                <i className="bi bi-patch-check-fill me-3 fs-5 text-success"></i>
                <span className="fw-semibold">Service Certificate</span>
                <i className={`bi bi-chevron-${expandedMenus.includes('serviceCertificate') ? 'up' : 'down'} ms-auto small transition-transform`}></i>
              </button>
              <div className={`collapse ${expandedMenus.includes('serviceCertificate') ? 'show' : ''}`}>
                <div className="ps-4 pe-2 py-1">
                  <Link
                    to="/service-certificate?center=ccat"
                    className={`list-group-item list-group-item-action border-0 rounded-2 py-2 px-3 d-flex align-items-center mb-1 ${
                      isActiveRoute('/service-certificate') ? 'bg-light' : 'text-dark text-opacity-75'
                    }`}
                  >
                    <i className="bi bi-cpu-fill me-3 fs-6 text-primary"></i>
                    <span className="fw-semibold small">Centre for Certification of Advanced Technology</span>
                  </Link>
                  <Link
                    to="/service-certificate?center=scc"
                    className="list-group-item list-group-item-action border-0 rounded-2 py-2 px-3 d-flex align-items-center mb-1 text-dark text-opacity-75"
                  >
                    <i className="bi bi-code-slash me-3 fs-6 text-success"></i>
                    <span className="fw-semibold small">Software Certification Centre</span>
                  </Link>
                  <Link
                    to="/service-certificate?center=srm"
                    className="list-group-item list-group-item-action border-0 rounded-2 py-2 px-3 d-flex align-items-center mb-1 text-dark text-opacity-75"
                  >
                    <i className="bi bi-cone-striped me-3 fs-6 text-danger"></i>
                    <span className="fw-semibold small">Safety Reliability & Maintainability</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* DOAS Menu */}
            <Link
              to="/doas"
              className={`list-group-item list-group-item-action border-0 rounded-2 py-3 px-3 d-flex align-items-center mb-1 ${
                isActiveRoute('/doas') ? 'bg-light' : 'text-dark text-opacity-75'
              }`}
            >
              <i className="bi bi-award-fill me-3 fs-5 text-warning"></i>
              <span className="fw-semibold">DOAS</span>
            </Link>

            {/* Help Document */}
            <Link
              to="/help-document"
              className={`list-group-item list-group-item-action border-0 rounded-2 py-3 px-3 d-flex align-items-center mb-1 ${
                isActiveRoute('/help-document') ? 'bg-light' : 'text-dark text-opacity-75'
              }`}
            >
              <i className="bi bi-file-earmark-medical me-3 fs-5 text-info"></i>
              <span className="fw-semibold">Help Document</span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="list-group-item list-group-item-action border-0 rounded-2 py-3 px-3 d-flex align-items-center text-danger mb-1 w-100 text-start"
            >
              <i className="bi bi-power me-3 fs-5"></i>
              <span className="fw-semibold">Logout Session</span>
            </button>

          </div>
        </div>
        <div className="card-footer bg-light border-0 p-3 rounded-bottom-3 border-top font-monospace text-muted" style={{ fontSize: '0.72rem', lineHeight: 1.3 }}>
          <i className="bi bi-info-circle-fill text-primary me-1"></i>
          File size shall be less than <span className="text-danger fw-bold">500 MB</span>
        </div>
      </div>
  );
};

export default NavigationSidebar;