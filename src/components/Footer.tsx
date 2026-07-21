import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4 mt-auto text-white" style={{ background: 'linear-gradient(135deg, #111111 0%, #0A3663 100%)' }}>
      <div className="container-fluid px-4 text-center">
        {/* Main Copyright Information Line */}
        <p className="mb-2 fw-bold text-warning">
          Note: The cyber security and information security norms released by Ministry of Defence, Govt. of India shall be adhered to by Design Agencies. 
          Company confidential and IP data shall be transmitted as per Design Agency information security policies.
        </p>
        <p className="mb-2 opacity-5">
          &copy; 2026 Centre for Military Airworthiness & Certification (CEMILAC). All Rights Reserved.
        </p>
        {/* System Version Metadata Descriptor */}
        <p className="mb-0 font-monospace small text-white-50">
          Portal Version: <span className="badge bg-secondary px-2 py-1">4.1.4</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;