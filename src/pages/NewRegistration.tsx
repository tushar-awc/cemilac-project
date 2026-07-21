import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/MainLayout';
import { RegistrationFormData } from '../types';

interface FormData {
  // Step 1: Contact Information
  firstName: string;
  lastName: string;
  jobTitle: string;
  contactNumber: string;
  officialEmail: string;
  companyName: string;
  companyAddress: string;
  postOffice: string;
  pincode: string;
  
  // Step 2: Project Details
  doaDetails: string;
  doaValidity: string;
  doaScope: string;
  poaDetails: string;
  poaValidity: string;
  poaScope: string;
  projectName: string;
  projectPartNumber: string;
  projectDescription: string;
  imtarSubpart: string;
  pbsFile: File | null;
  
  // Declarations
  declaration1: boolean;
  declaration2: boolean;
  declaration3: boolean;
}

const NewRegistration: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    jobTitle: '',
    contactNumber: '',
    officialEmail: '',
    companyName: 'CEMILAC',
    companyAddress: 'Dodannekundi, Bangalore',
    postOffice: 'Bangalore',
    pincode: '123456',
    doaDetails: '',
    doaValidity: '',
    doaScope: '',
    poaDetails: '',
    poaValidity: '',
    poaScope: '',
    projectName: '',
    projectPartNumber: '',
    projectDescription: '',
    imtarSubpart: '',
    pbsFile: null,
    declaration1: false,
    declaration2: false,
    declaration3: false
  });

  // Generate system reference
  const [systemRef] = useState(() => {
    const now = new Date();
    return `DA_000000000226${now.getDate().toString().padStart(2, '0')}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getFullYear()}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
  });

  const todayDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric'
  });

  useEffect(() => {
    const companyName = localStorage.getItem('da_company_name') || user?.agencyName || 'CEMILAC';
    setFormData(prev => ({ ...prev, companyName }));
  }, [user]);
  const handleInputChange = (field: keyof FormData, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = (): boolean => {
    if (!formData.firstName || !formData.lastName || !formData.jobTitle || 
        !formData.contactNumber || !formData.officialEmail) {
      alert('Missing Field Inputs: Ensure all required Section 1 items are completed.');
      return false;
    }

    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(formData.pincode)) {
      alert('Format Check Failure: Communicational Pin code field requires an exactly 6-digit numerical string sequence alignment mapping.');
      return false;
    }

    return true;
  };

  const validateStep2 = (): boolean => {
    // DOA/POA validation
    const hasDoa = formData.doaDetails || formData.doaValidity || formData.doaScope;
    if (hasDoa) {
      if (!formData.poaDetails || !formData.poaValidity || !formData.poaScope) {
        alert('Missing POA Details: When DOA is filled, POA Details, Validity and Scope become mandatory.');
        return false;
      }
    }

    if (!formData.projectName || !formData.projectPartNumber || !formData.pbsFile) {
      alert('Missing Technical Configuration: Fill out required Section 2 fields and attach the PBS architecture file to map system criteria inputs.');
      return false;
    }

    if (!formData.declaration1 || !formData.declaration2 || !formData.declaration3) {
      alert('Compliance Declaration Required: You must evaluate and check all checkbox attestation boxes to proceed.');
      return false;
    }

    return true;
  };

  const goToStep = (step: number) => {
    if (step === 2 && currentStep === 1) {
      if (!validateStep1()) return;
    }
    
    if (step === 3 && currentStep === 2) {
      if (!validateStep2()) return;
    }

    setCurrentStep(step);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const sizeInMB = file.size / (1024 * 1024);
      if (sizeInMB > 500) {
        alert('Sizing Constraint Bound Triggered: This breakdown payload structure exceeds the maximum threshold allowance parameter configuration of 500MB.');
        event.target.value = '';
        return;
      }
      handleInputChange('pbsFile', file);
    }
  };
  const updateCharCount = (value: string) => {
    return 255 - value.length;
  };

  const processFinalSubmission = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentStep(4);
    } catch (error) {
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadSummaryPDF = () => {
    // Trigger print for the document canvas
    window.print();
  };

  const cancelRegistration = () => {
    if (window.confirm('Are you sure you want to cancel the registration? All entered data will be lost.')) {
      navigate('/dashboard');
    }
  };

  const resetForm = () => {
    if (window.confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
      setFormData({
        firstName: '',
        lastName: '',
        jobTitle: '',
        contactNumber: '',
        officialEmail: '',
        companyName: formData.companyName,
        companyAddress: 'Dodannekundi, Bangalore',
        postOffice: 'Bangalore',
        pincode: '123456',
        doaDetails: '',
        doaValidity: '',
        doaScope: '',
        poaDetails: '',
        poaValidity: '',
        poaScope: '',
        projectName: '',
        projectPartNumber: '',
        projectDescription: '',
        imtarSubpart: '',
        pbsFile: null,
        declaration1: false,
        declaration2: false,
        declaration3: false
      });
      setCurrentStep(1);
    }
  };

  return (
    <MainLayout>
      <div className="card shadow-sm border-0 rounded-3 mb-4">{/* Card content will continue in next chunk */}
              
              {/* Registration Flow Header Step Indicator */}
              <div className="card-header bg-white py-4 border-bottom">
                <div className="row text-center g-2">
                  <div className={`col-4 ${currentStep === 1 ? 'step-active' : currentStep > 1 ? 'step-complete' : ''}`}>
                    <span className="step-badge">1</span>
                    <span className="fw-semibold small text-uppercase d-none d-md-inline">Contact Information</span>
                  </div>
                  <div className={`col-4 ${currentStep === 2 ? 'step-active' : currentStep > 2 ? 'step-complete' : ''}`}>
                    <span className="step-badge">2</span>
                    <span className="fw-semibold small text-uppercase d-none d-md-inline">Project Details</span>
                  </div>
                  <div className={`col-4 ${currentStep === 3 ? 'step-active' : currentStep > 3 ? 'step-complete' : ''}`}>
                    <span className="step-badge">3</span>
                    <span className="fw-semibold small text-uppercase d-none d-md-inline">View Application</span>
                  </div>
                </div>
              </div>

              <div className="card-body p-4 p-md-5">
                
                {/* Step 1: Contact Information */}
                {currentStep === 1 && (
                  <div className="registration-panel">
                    <h4 className="fw-bold text-dark mb-4 border-bottom pb-2">Section 1: Contact & Submitter Information</h4>
                    
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-bold text-secondary font-monospace small">Submission Date</label>
                        <input type="text" className="form-control bg-light" value={todayDate} readOnly />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold text-secondary font-monospace small">
                          Applicant's Reference (System Generated)
                        </label>
                        <input type="text" className="form-control bg-light font-monospace" value={systemRef} readOnly />
                      </div>
                    </div>

                    <h6 className="fw-bold text-primary mb-3">Primary Liaison Details</h6>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label htmlFor="first_name" className="form-label small fw-semibold">
                          First Name <span className="text-danger">*</span>
                        </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="first_name" 
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required 
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="last_name" className="form-label small fw-semibold">
                          Last Name <span className="text-danger">*</span>
                        </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="last_name" 
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required 
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="job_title" className="form-label small fw-semibold">
                          Job Title or Designation <span className="text-danger">*</span>
                        </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="job_title" 
                          placeholder="e.g. Senior Design Engineer"
                          value={formData.jobTitle}
                          onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                          required 
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="contact_num" className="form-label small fw-semibold">
                          Contact Number (Mobile / Landline) <span className="text-danger">*</span>
                        </label>
                        <input 
                          type="tel" 
                          className="form-control" 
                          id="contact_num"
                          value={formData.contactNumber}
                          onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                          required 
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="official_email" className="form-label small fw-semibold">
                          Official e-Mail Address <span className="text-danger">*</span>
                        </label>
                        <input 
                          type="email" 
                          className="form-control" 
                          id="official_email" 
                          placeholder="name@organization.gov.in"
                          value={formData.officialEmail}
                          onChange={(e) => handleInputChange('officialEmail', e.target.value)}
                          required 
                        />
                      </div>
                    </div>

                    <h6 className="fw-bold text-primary mb-3">Address for Communication</h6>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="comp_name" className="form-label small fw-semibold">
                          Company Name{' '}
                          <span className="badge bg-secondary ms-2 opacity-75" style={{ fontSize: '0.65rem' }}>
                            Auto-Populated
                          </span>
                        </label>
                        <input 
                          type="text" 
                          className="form-control text-muted bg-light" 
                          id="comp_name"
                          value={formData.companyName}
                          disabled 
                          required 
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="comp_addr" className="form-label small fw-semibold">Company Address</label>
                        <input 
                          type="text" 
                          className="form-control bg-light text-muted" 
                          id="comp_addr"
                          value={formData.companyAddress}
                          disabled 
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="post_office" className="form-label small fw-semibold">Post Office</label>
                        <input 
                          type="text" 
                          className="form-control bg-light text-muted" 
                          id="post_office"
                          value={formData.postOffice}
                          disabled 
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <label htmlFor="pincode" className="form-label small fw-semibold">Pincode</label>
                        <input 
                          type="text" 
                          className="form-control font-monospace" 
                          id="pincode"
                          value={formData.pincode}
                          onChange={(e) => handleInputChange('pincode', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Step 1 Buttons */}
                    <div className="d-flex justify-content-between pt-3 border-top">
                      <button type="button" className="btn btn-outline-danger px-4" onClick={cancelRegistration}>
                        Cancel
                      </button>
                      <div>
                        <button type="button" className="btn btn-outline-secondary px-4 me-2" onClick={resetForm}>
                          Reset
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-primary px-5" 
                          style={{ backgroundColor: 'var(--drdo-blue)' }}
                          onClick={() => goToStep(2)}
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Project Details */}
                {currentStep === 2 && (
                  <div className="registration-panel">
                    <h4 className="fw-bold text-dark mb-4 border-bottom pb-2">Section 2: Technical Project Details</h4>
                    
                    <h6 className="fw-bold text-primary mb-3">Organization Approval Details</h6>
                    <div className="row g-3 mb-4">
                      <div className="col-md-4">
                        <label htmlFor="doa_details" className="form-label small fw-semibold">DOA Details</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="doa_details"
                          value={formData.doaDetails}
                          onChange={(e) => handleInputChange('doaDetails', e.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="doa_validity" className="form-label small fw-semibold">
                          Select DOA Validity {formData.doaDetails && <span className="text-danger">*</span>}
                        </label>
                        <input 
                          type="date" 
                          className="form-control" 
                          id="doa_validity"
                          value={formData.doaValidity}
                          onChange={(e) => handleInputChange('doaValidity', e.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="doa_scope" className="form-label small fw-semibold">
                          DOA Scope {formData.doaDetails && <span className="text-danger">*</span>}
                        </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="doa_scope"
                          value={formData.doaScope}
                          onChange={(e) => handleInputChange('doaScope', e.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="poa_details" className="form-label small fw-semibold">POA Details</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="poa_details"
                          value={formData.poaDetails}
                          onChange={(e) => handleInputChange('poaDetails', e.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="poa_validity" className="form-label small fw-semibold">
                          Select POA Validity {formData.doaDetails && <span className="text-danger">*</span>}
                        </label>
                        <input 
                          type="date" 
                          className="form-control" 
                          id="poa_validity"
                          value={formData.poaValidity}
                          onChange={(e) => handleInputChange('poaValidity', e.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="poa_scope" className="form-label small fw-semibold">
                          POA Scope {formData.doaDetails && <span className="text-danger">*</span>}
                        </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="poa_scope"
                          value={formData.poaScope}
                          onChange={(e) => handleInputChange('poaScope', e.target.value)}
                        />
                      </div>
                    </div>

                    <h6 className="fw-bold text-primary mb-3">System Description</h6>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label htmlFor="proj_name" className="form-label small fw-semibold">
                          Project Name <span className="text-danger">*</span>
                        </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="proj_name"
                          value={formData.projectName}
                          onChange={(e) => handleInputChange('projectName', e.target.value)}
                          required 
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="proj_part_num" className="form-label small fw-semibold">
                          Project Part Number <span className="text-danger">*</span>
                        </label>
                        <input 
                          type="text" 
                          className="form-control font-monospace" 
                          id="proj_part_num" 
                          placeholder="e.g. LCA-WG-7712"
                          value={formData.projectPartNumber}
                          onChange={(e) => handleInputChange('projectPartNumber', e.target.value)}
                          required 
                        />
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-content-between">
                          <label htmlFor="proj_desc" className="form-label small fw-semibold">
                            Provide details about project <span className="text-danger">*</span>
                          </label>
                          <span className="text-muted small font-monospace">
                            {updateCharCount(formData.projectDescription)} Characters Remaining
                          </span>
                        </div>
                        <textarea 
                          className="form-control" 
                          id="proj_desc" 
                          rows={3} 
                          maxLength={255}
                          value={formData.projectDescription}
                          onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                          required 
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="imtar_subpart" className="form-label small fw-semibold">
                          Project IMTAR Sub-Part <span className="text-danger">*</span>
                        </label>
                        <select 
                          id="imtar_subpart" 
                          className="form-select"
                          value={formData.imtarSubpart}
                          onChange={(e) => handleInputChange('imtarSubpart', e.target.value)}
                          required
                        >
                          <option value="">-- Select Sub-Part --</option>
                          <option value="Subpart B - Avionics">Subpart B - Avionics</option>
                          <option value="Subpart C - Structures">Subpart C - Structures</option>
                          <option value="Subpart D - Powerplants">Subpart D - Powerplants</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="pbs_file" className="form-label small fw-semibold">
                          Product Breakdown Structure File (Max 500MB) <span className="text-danger">*</span>
                        </label>
                        <input 
                          type="file" 
                          className="form-control" 
                          id="pbs_file"
                          onChange={handleFileChange}
                          required 
                        />
                      </div>
                    </div>

                    <h6 className="fw-bold text-danger mb-3">Applicant's Declaration</h6>
                    <div className="p-3 bg-light rounded border mb-4 small text-secondary">
                      <div className="form-check mb-2">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="dec_1"
                          checked={formData.declaration1}
                          onChange={(e) => handleInputChange('declaration1', e.target.checked)}
                          required 
                        />
                        <label className="form-check-label" htmlFor="dec_1">
                          I declare that I am authorized by my organization to submit this application to CEMILAC and that all information provided in this application form is correct and complete.
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="dec_2"
                          checked={formData.declaration2}
                          onChange={(e) => handleInputChange('declaration2', e.target.checked)}
                          required 
                        />
                        <label className="form-check-label" htmlFor="dec_2">
                          I acknowledge that I have read and understood the IMTAR-21.
                        </label>
                      </div>
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="dec_3"
                          checked={formData.declaration3}
                          onChange={(e) => handleInputChange('declaration3', e.target.checked)}
                          required 
                        />
                        <label className="form-check-label" htmlFor="dec_3">
                          I understand that the submission of the application does not entitle certification coverage by CEMILAC.
                        </label>
                      </div>
                    </div>

                    {/* Step 2 Buttons */}
                    <div className="d-flex justify-content-between pt-3 border-top">
                      <button type="button" className="btn btn-outline-secondary px-4" onClick={() => goToStep(1)}>
                        ← Previous
                      </button>
                      <div>
                        <button type="button" className="btn btn-outline-danger px-4 me-2" onClick={cancelRegistration}>
                          Cancel
                        </button>
                        <button type="button" className="btn btn-outline-secondary px-4 me-2" onClick={resetForm}>
                          Reset
                        </button>
                        <button type="button" className="btn btn-success px-5" onClick={() => goToStep(3)}>
                          Next →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: View Application */}
                {currentStep === 3 && (
                  <div className="registration-panel">
                    
                    {/* Print Target Document Canvas */}
                    <div 
                      id="printTargetDocumentCanvas" 
                      className="p-4 bg-white border border-2 rounded-3 mb-4 shadow-sm" 
                      style={{ borderColor: '#0A3663' }}
                    >
                      
                      {/* Document Header */}
                      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-4">
                        <div className="d-flex align-items-center">
                          <div className="bg-white p-1 rounded d-flex align-items-center justify-content-center shadow-xs border" style={{ width: '70px', height: '70px' }}>
                            <img 
                              src="/assets/img/cemilac_logo.png" 
                              alt="CEMILAC Logo" 
                              className="img-fluid" 
                              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const fallback = document.createElement('i');
                                fallback.className = 'bi bi-shield-check text-primary fs-1';
                                target.parentNode?.appendChild(fallback);
                              }}
                            />
                          </div>
                          <div className="ms-3">
                            <h3 className="fw-bold text-dark m-0 tracking-tight" style={{ color: '#0A3663' }}>
                              Centre for Military Airworthiness and Certification (CEMILAC)
                            </h3>
                            <small className="text-secondary uppercase font-monospace font-semibold small">
                              Defence Research & Development Organisation (DRDO) | Government of India
                            </small>
                          </div>
                        </div>
                        <div className="text-end font-monospace small border p-2 bg-light rounded">
                          <div className="fw-bold text-primary text-uppercase">REGISTRATION RECORD SHEET</div>
                          <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                            <i className="bi bi-clock-history"></i> Issued: {new Date().toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      <h5 className="fw-bold text-white text-center py-2 mb-4 border text-uppercase font-monospace" style={{ backgroundColor: '#0A3663' }}>
                        Project Registration Form: View Application
                      </h5>
                      
                      {/* Data Tables */}
                      <div className="row g-3">
                        <div className="col-6">
                          <table className="table table-sm table-bordered bg-light align-middle mb-0" style={{ fontSize: '0.82rem' }}>
                            <thead className="text-white" style={{ backgroundColor: '#0A3663' }}>
                              <tr>
                                <th colSpan={2} className="p-2">
                                  <i className="bi bi-person-lines-fill me-2"></i> 
                                  Section 1: Contact Parameters Summary
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th style={{ width: '40%' }} className="p-2 bg-light-subtle">Reference Identifier</th>
                                <td className="font-monospace fw-bold text-primary p-2">{systemRef}</td>
                              </tr>
                              <tr>
                                <th className="p-2 bg-light-subtle">Liaison Full Name</th>
                                <td className="p-2">{formData.firstName} {formData.lastName}</td>
                              </tr>
                              <tr>
                                <th className="p-2 bg-light-subtle">Designation Title</th>
                                <td className="p-2">{formData.jobTitle}</td>
                              </tr>
                              <tr>
                                <th className="p-2 bg-light-subtle">Contact Node String</th>
                                <td className="p-2">{formData.contactNumber}</td>
                              </tr>
                              <tr>
                                <th className="p-2 bg-light-subtle">Official Email Destination</th>
                                <td className="p-2">{formData.officialEmail}</td>
                              </tr>
                              <tr>
                                <th className="p-2 bg-light-subtle">Communications Address</th>
                                <td className="text-wrap p-2">
                                  {formData.companyName}, {formData.companyAddress}, PO: {formData.postOffice} - {formData.pincode}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="col-6">
                          <table className="table table-sm table-bordered bg-light align-middle mb-0" style={{ fontSize: '0.82rem' }}>
                            <thead className="text-white" style={{ backgroundColor: '#0A3663' }}>
                              <tr>
                                <th colSpan={2} className="p-2">
                                  <i className="bi bi-cpu-fill me-2"></i> 
                                  Section 2: Technical Specifications Matrix
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th style={{ width: '40%' }} className="p-2 bg-light-subtle">DOA Parameters String</th>
                                <td className="p-2">
                                  {formData.doaDetails} {formData.doaValidity && `(Valid Till: ${formData.doaValidity})`} {formData.doaScope && `Scope: ${formData.doaScope}`}
                                </td>
                              </tr>
                              <tr>
                                <th className="p-2 bg-light-subtle">POA Parameters String</th>
                                <td className="p-2">
                                  {formData.poaDetails} {formData.poaValidity && `(Valid Till: ${formData.poaValidity})`} {formData.poaScope && `Scope: ${formData.poaScope}`}
                                </td>
                              </tr>
                              <tr>
                                <th className="p-2 bg-light-subtle">Airworthiness Identification</th>
                                <td className="fw-bold p-2">{formData.projectName}</td>
                              </tr>
                              <tr>
                                <th className="p-2 bg-light-subtle">Component Part Number</th>
                                <td className="font-monospace p-2">{formData.projectPartNumber}</td>
                              </tr>
                              <tr>
                                <th className="p-2 bg-light-subtle">IMTAR Scope Segment</th>
                                <td className="p-2">{formData.imtarSubpart}</td>
                              </tr>
                              <tr>
                                <th className="p-2 bg-light-subtle">Technical Description</th>
                                <td className="text-wrap p-2">{formData.projectDescription}</td>
                              </tr>
                              <tr>
                                <th className="p-2 bg-light-subtle">PBS Attachment Element</th>
                                <td className="text-success font-monospace small p-2">
                                  {formData.pbsFile ? formData.pbsFile.name : 'None attached'}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>

                    {/* Step 3 Buttons */}
                    <div className="d-flex justify-content-between pt-3 border-top">
                      <button type="button" className="btn btn-outline-secondary px-4" onClick={() => goToStep(2)}>
                        ← Previous
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-success px-5 py-2 shadow-sm"
                        onClick={processFinalSubmission}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-cloud-arrow-up-fill me-2"></i>Submit
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Success View */}
                {currentStep === 4 && (
                  <div className="registration-panel text-center py-4">
                    <div className="d-inline-flex p-4 bg-success-subtle text-success rounded-circle mb-3">
                      <i className="bi bi-check-all display-3"></i>
                    </div>
                    <h2 className="fw-bold text-dark mb-2">Submitted Successfully</h2>
                    <p className="text-muted mb-4">
                      The airworthiness evaluation pipeline data configuration instance has been captured and validated.
                    </p>
                    
                    <div className="d-flex justify-content-center gap-3">
                      <button 
                        type="button" 
                        className="btn btn-primary px-4 py-2" 
                        style={{ backgroundColor: 'var(--drdo-blue)' }}
                        onClick={downloadSummaryPDF}
                      >
                        <i className="bi bi-file-earmark-pdf-fill me-2"></i> Download Registration Form
                      </button>
                      <Link to="/dashboard" className="btn btn-outline-secondary px-4 py-2">
                        Return to System Dashboard
                      </Link>
                    </div>
                  </div>
                )}

              </div>
            </div>
    </MainLayout>
  );
};

export default NewRegistration;