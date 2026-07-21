// TypeScript interfaces and types for CEMILAC DA-ISO System

export interface User {
  id: string;
  token: string;
  role: 'DA' | 'QA';
  agencyId: string;
  agencyName: string;
}

export interface Project {
  id: string;
  name: string;
  partNumber: string;
  stage: string;
  status: 'Active' | 'Pending' | 'Rejected' | 'Approved by Board';
  updatedAt: string;
  projectLeader?: ProjectLeader;
  dealingOfficer?: DealingOfficer;
  qaName?: string;
  usrName?: string;
  documents?: ProjectDocument[];
}

export interface ProjectLeader {
  name: string;
  designation: string;
  phone: string;
}

export interface DealingOfficer {
  name: string;
  designation: string;
  phone: string;
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: string;
  status: 'Pending' | 'Submitted' | 'Approved' | 'Rejected';
  submittedDate?: string;
  remarks?: string;
  filePath?: string;
  fileSize?: number;
}

export interface ApplicabilityMatrixItem {
  id: string;
  srNo: number;
  documentName: string;
  applicability: 'Applicable' | 'Not Applicable' | 'Conditionally Applicable';
  status: 'Pending' | 'Submitted' | 'Approved' | 'Rejected';
  submittedFile?: string;
  remarks?: string;
  qaRemarks?: string;
  usrRemarks?: string;
}

export interface Registration {
  id: string;
  projectName: string;
  projectType: string;
  description: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  submittedDate?: string;
  documents: RegistrationDocument[];
}

export interface RegistrationDocument {
  id: string;
  name: string;
  required: boolean;
  uploaded: boolean;
  filePath?: string;
  description?: string;
}

export interface ServiceCertificate {
  id: string;
  center: 'ccat' | 'scc' | 'srm';
  centerName: string;
  projectId: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  applicationDate: string;
  expectedDate?: string;
  completionDate?: string;
  documents: CertificateDocument[];
}

export interface CertificateDocument {
  id: string;
  name: string;
  required: boolean;
  uploaded: boolean;
  filePath?: string;
  status?: 'Pending' | 'Approved' | 'Rejected';
}

export interface DOASApplication {
  id: string;
  type: 'apply' | 'modify';
  projectId: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  submittedDate?: string;
  approvalDate?: string;
  documents: DOASDocument[];
}

export interface DOASDocument {
  id: string;
  name: string;
  required: boolean;
  uploaded: boolean;
  filePath?: string;
  description?: string;
}

export interface RaisedRequest {
  id: string;
  projectId: string;
  projectName: string;
  requestType: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  submittedDate: string;
  resolvedDate?: string;
  assignedTo?: string;
  comments?: RequestComment[];
}

export interface RequestComment {
  id: string;
  message: string;
  author: string;
  timestamp: string;
  attachments?: string[];
}

export interface ChatMessage {
  id: string;
  projectId?: string;
  sender: string;
  senderRole: 'DA' | 'QA' | 'PL' | 'DO' | 'System';
  message: string;
  timestamp: string;
  attachments?: ChatAttachment[];
  messageType?: 'text' | 'file' | 'system';
}

export interface ChatAttachment {
  id: string;
  fileName: string;
  fileSize: number;
  filePath: string;
  uploadedAt: string;
}

export interface BroadcastNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  isRead: boolean;
  priority: 'Low' | 'Medium' | 'High';
}

export interface Certificate {
  id: string;
  projectId: string;
  projectName: string;
  certificateType: string;
  status: 'Valid' | 'Expired' | 'Revoked' | 'Pending';
  issueDate: string;
  expiryDate?: string;
  certificateNumber: string;
  issuedBy: string;
  qrCodeData?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  recordsPerPage: number;
}

export interface FilterOptions {
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  projectType?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Form Types
export interface LoginFormData {
  daToken: string;
}

export interface RegistrationFormData {
  projectName: string;
  projectType: string;
  description: string;
  expectedDelivery: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  documents: File[];
}

export interface FileUploadProgress {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

// Context Types
export interface AuthContextType {
  user: User | null;
  login: (token: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface ProjectContextType {
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  projects: Project[];
  refreshProjects: () => Promise<void>;
}

// API Endpoints
export interface ApiEndpoints {
  auth: {
    login: string;
    logout: string;
    verify: string;
  };
  projects: {
    list: string;
    details: (id: string) => string;
    create: string;
    update: (id: string) => string;
    delete: (id: string) => string;
  };
  documents: {
    upload: string;
    download: (id: string) => string;
    delete: (id: string) => string;
  };
  certificates: {
    generate: (projectId: string) => string;
    download: (certificateId: string) => string;
  };
  communications: {
    messages: (projectId: string) => string;
    sendMessage: string;
    uploadAttachment: string;
  };
}

// Utility Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type ThemeMode = 'light' | 'dark';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationState {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  autoClose?: boolean;
  duration?: number;
}