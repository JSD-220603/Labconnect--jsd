export type UserRole = 'ADMIN' | 'MANAGER' | 'PATHOLOGIST' | 'CLINICIAN' | 'TECHNICIAN';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface Test {
  id: string;
  name: string;
  category: string;
  price: number;
  parameters: string[];
}

export interface Order {
  id: string;
  patientName: string;
  tests: string[];
  status: 'PENDING' | 'COLLECTED' | 'PROCESSING' | 'COMPLETED' | 'AUTHORIZED';
  createdAt: string;
  specimenId?: string;
}

export interface TestResult {
  id: string;
  orderId: string;
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'PRELIMINARY' | 'FINAL';
  authorizedBy?: string;
}

export interface WorkflowStep {
  id: string;
  orderId: string;
  stage: 'ACCESSIONING' | 'PRE-ANALYTICAL' | 'ANALYTICAL' | 'POST-ANALYTICAL';
  status: 'IN_PROGRESS' | 'COMPLETED';
  updatedAt: string;
}
