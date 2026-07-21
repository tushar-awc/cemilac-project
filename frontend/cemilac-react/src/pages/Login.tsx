import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface PopupProps {
  show: boolean;
  type: 'success' | 'error' | 'loading' | 'progress';
  title: string;
  message: string;
  onContinue?: () => void;
  showProgress?: boolean;
}

const Popup: React.FC<PopupProps> = ({ show, type, title, message, onContinue, showProgress }) => {
  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>;
      case 'error':
        return <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: '3rem' }}></i>;
      case 'loading':
        return <i className="bi bi-info-circle-fill text-primary" style={{ fontSize: '3rem' }}></i>;
      case 'progress':
        return <i className="bi bi-download text-primary" style={{ fontSize: '3rem' }}></i>;
      default:
        return <i className="bi bi-info-circle-fill text-primary" style={{ fontSize: '3rem' }}></i>;
    }
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
         style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999 }}>
      <div className="bg-white rounded-4 shadow-lg p-4 text-center" style={{ minWidth: '350px', maxWidth: '500px' }}>
        <div className="mb-3">
          {getIcon()}
        </div>
        <h3 className="mb-2 fw-bold" style={{ color: '#2c3e50' }}>{title}</h3>
        <hr className="mx-3" />
        <p className="text-danger mb-3" style={{ fontSize: '0.95rem' }}>{message}</p>
        
        {showProgress && (
          <div className="progress mb-3" style={{ height: '8px' }}>
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
                 role="progressbar" 
                 style={{ width: '100%' }}>
            </div>
          </div>
        )}
        
        {onContinue && (
          <button 
            type="button" 
            className="btn btn-primary px-4 py-2 fw-semibold rounded-3"
            onClick={onContinue}
            style={{ backgroundColor: 'var(--drdo-blue)', borderColor: 'var(--drdo-blue)' }}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

// Simple Connection Status for Top-Right Corner (REMOVED)
// Connection status functionality moved to Header.tsx

const Login: React.FC = () => {
  const [daToken, setDaToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [tokenError, setTokenError] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Popup states
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);
  const [showProgressPopup, setShowProgressPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  
  const { user, login } = useAuth();
  const navigate = useNavigate();
  
  const BASE_URL = 'https://cemilac-project-backend.onrender.com/iso/api/v1/';

  // Initialize page - equivalent to JSP onload="initializePage()"
  useEffect(() => {
    const initializePage = async () => {
      if (sessionStorage.getItem('c') === '0' || !sessionStorage.getItem('c')) {
        sessionStorage.setItem('c', '0');
        sessionStorage.setItem('status', '1');
        
        await downloadStaticCheck();
      }
      setIsInitialized(true);
    };

    if (!user) {
      initializePage();
    }
  }, [user]);

  // Handle Enter key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleLoginCheck();
      }
    };

    if (!user) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [daToken, user]);

  // Redirect if already authenticated
  if (user) {
    const redirectPath = user.role === 'QA' ? '/qa-dashboard' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  const getConnectionStatus = async () => {
    // Connection status is now handled in Header.tsx
    return Promise.resolve();
  };

  const downloadStaticCheck = async () => {
    try {
      setShowProgressPopup(true);
      
      const response = await fetch(`${BASE_URL}/downloadStatus`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        cache: 'no-cache'
      });
      
      const result = await response.text();
      setShowProgressPopup(false);
      
      if (result === 'success') {
        sessionStorage.setItem('staticdowncheck', '1');
      } else {
        // Handle all error cases from JSP
        handleDownloadError(result);
      }
    } catch (error) {
      setShowProgressPopup(false);
      showErrorMessage('Error !', 'Error: Network connection failed');
    }
  };

  const handleDownloadError = (errorType: string) => {
    const errorMappings: { [key: string]: { code: string; message: string } } = {
      'corrupted': { code: 'Error 301', message: 'Invalid Static file or file may be corrupt' },
      'Socket Fail': { code: 'Error 102', message: 'Unable to create socket' },
      'Bind Fail': { code: 'Error 103', message: 'Bind fail' },
      'Server Not Ready': { code: 'Error 104', message: 'Connection failed, server not ready' },
      'Recieve Fail': { code: 'Error 105', message: 'Data not received from server' },
      'Ack Not Recieve': { code: 'Error 106', message: 'Acknowledgement not received from server' },
      'File Not Available': { code: 'Error 108', message: 'File does not exist at server' },
      'No Write Permission': { code: 'Error 109', message: 'No write permission at destination folder' },
      'Few files downloaded': { code: 'Error 110', message: 'Only few files are downloaded' },
      'Download Fail': { code: 'Error 111', message: 'Download failed, try after sometime' },
      'Permission Denied': { code: 'Error 114', message: 'Permission denied to download files' },
      'Send Fail': { code: 'Error 116', message: 'File send failed' },
      'Dongle error': { code: 'Error 117', message: 'Dongle error' },
      'Invalid download mode': { code: 'Error 118', message: 'Invalid download mode' },
      'De transform fail': { code: 'Error 119', message: 'De-transform failed' },
      'General error': { code: 'Error 120', message: 'Download failed' },
      'Auth/Nounce Fail': { code: 'Error 121', message: 'Auth/Nonce fail' },
      'Lock unavailable': { code: 'Error 122', message: 'Lock unavailable' }
    };

    const error = errorMappings[errorType] || { code: 'Error', message: 'Unknown error occurred' };
    showErrorMessage('Error !', `${error.code} : ${error.message}`);
  };

  const validateToken = (): boolean => {
    const tokenValue = daToken.trim();
    // Regular expression for validating alphanumeric input of length 8 to 15
    const alphanumericRegex = /^[a-zA-Z0-9]{8,15}$/;

    if (!alphanumericRegex.test(tokenValue)) {
      setTokenError('Invalid token!');
      return false;
    } else {
      setTokenError('');
      return true;
    }
  };

  const handleLoginCheck = async () => {
    const isTokenValid = validateToken();
    if (!isTokenValid) {
      return;
    }

    setIsLoading(true);
    setShowLoadingPopup(true);

    // Check semaphore
    if (sessionStorage.getItem('SEMAPHORE') === '1') {
      setTimeout(() => {
        handleLoginCheck();
      }, 5000);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/login?token=${daToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        cache: 'no-cache',
        signal: AbortSignal.timeout(10000) // 10 second timeout for login
      });
      
      const result = await response.text();
      setShowLoadingPopup(false);
      
      if (result === 'login success') {
        // Set session storage items
        sessionStorage.setItem('just_logged_in', 'true');
        localStorage.setItem('da_company_name', 'CEMILAC');
        localStorage.setItem('da_observation_pending', 'true');
        localStorage.setItem('da_observation_downloaded', 'false');
        localStorage.setItem('qa_doc_downloaded', 'false');
        
        // Update auth context with user data
        await login(daToken);
        
        navigate('/dashboard');
      } else {
        handleLoginError(result);
      }
    } catch (error) {
      setShowLoadingPopup(false);
      
      // Show connection failed popup
      showErrorMessage('Connection Failed', 'Unable to reach the authentication server. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginError = (errorType: string) => {
    if (errorType === 'already login') {
      setError('User session is already running. Please close the tab/browser');
    } else if (errorType === 'CredentialFileNotAvailable') {
      showErrorMessage('Login Failed', 'Error 301 : Invalid static file or file may be corrupt');
    } else if (errorType === 'corrupted') {
      showErrorMessage('Login Failed', 'Error 302 : Invalid Static file or file may be corrupt');
    } else if (errorType === 'invalid Data') {
      showErrorMessage('Login Failed', 'Error : Invalid data found');
    } else if (errorType === 'connection fail') {
      showErrorMessage('Connection Failed', 'Error 403 : Server not reachable');
    } else {
      showErrorMessage('Login Failed', 'Authentication failed. Please try again.');
    }
  };

  const showErrorMessage = (title: string, message: string) => {
    setPopupTitle(title);
    setPopupMessage(message);
    setShowErrorPopup(true);
  };

  const hideErrorPopup = () => {
    setShowErrorPopup(false);
    setIsLoading(false);
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setDaToken(value);
    setError('');
    setTokenError('');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      {/* Loading Popup */}
      <Popup 
        show={showLoadingPopup}
        type="loading"
        title="Please wait !"
        message="Login in progress."
        showProgress={true}
      />
      
      {/* Error Popup */}
      <Popup 
        show={showErrorPopup}
        type="error"
        title={popupTitle}
        message={popupMessage}
        onContinue={hideErrorPopup}
      />
      
      {/* Progress Popup for downloads */}
      <Popup 
        show={showProgressPopup}
        type="progress"
        title="Please Wait !"
        message="Initializing system..."
        showProgress={true}
      />
      
      <div className="container flex-grow-1 my-4 d-flex align-items-center">
        <div className="row w-100 align-items-center">
          
          {/* RIGHT SIDE: Welcome Promotional Hero Text Space Area */}
          <div className="col-lg-7 col-md-6 ps-md-4 text-center text-md-start">
            <h1 className="display-5 fw-extrabold text-dark tracking-tight mb-3" style={{ color: 'var(--drdo-blue)', fontSize: '2.5rem' }}>
              Welcome to CEMILAC <br /><span className="text-primary">e-Certification Portal</span>
            </h1>
            <p className="lead text-muted mb-4" style={{ fontSize: '1.1rem' }}>
              The secure software interface engineered for Design Agencies (DA) to seamlessly upload project artifacts, map system configurations against the airworthiness applicability matrix, and download assessment observations.
            </p> 
          </div>
          
          {/* LEFT SIDE: Secure Token Authentication Form Container */}
          <div className="col-lg-5 col-md-6 mb-4 mb-md-0">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-header text-center p-3 text-white" style={{ backgroundColor: 'var(--drdo-blue)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
                <i className="bi bi-fingerprint fs-2 text-warning"></i>
                <h4 className="mt-2 mb-0 fw-bold" style={{ fontSize: '1.3rem' }}>Secure Access Gateway</h4>
              </div>
              <div className="card-body p-4">
                
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setError('')}
                      aria-label="Close"
                    ></button>
                  </div>
                )}
                
                <form id="secureLoginForm" onSubmit={(e) => { e.preventDefault(); handleLoginCheck(); }}>
                  
                  {/* Alphanumeric Token Input Field */}
                  <div className="mb-4">
                    <label htmlFor="daUserNumber" className="form-label fw-bold text-secondary">DA Security Token</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light"><i className="bi bi-key-fill"></i></span>
                      <input 
                        type="text" 
                        name="da_token"
                        className="form-control text-uppercase font-monospace" 
                        id="daUserNumber" 
                        placeholder="DA Security Token"
                        value={daToken}
                        onChange={handleTokenChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    {tokenError && (
                      <span className="text-danger small">{tokenError}</span>
                    )}
                    <div className="form-text text-muted">Enter the 8-15 character alphanumeric sequence matching your hardware security key.</div>
                  </div> 

                  {/* Submit Access Button */}
                  <button 
                    type="submit" 
                    className="btn text-white w-100 py-2 fw-bold rounded-3 shadow-sm" 
                    style={{ 
                      backgroundColor: isLoading ? '#8c9095' : 'var(--drdo-blue)', 
                      borderColor: isLoading ? '#8c9095' : 'var(--drdo-blue)',
                      transition: 'all 0.2s', 
                      fontSize: '0.95rem' 
                    }}
                    disabled={isLoading || !isInitialized}
                    onClick={handleLoginCheck}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Verifying...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>

              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;