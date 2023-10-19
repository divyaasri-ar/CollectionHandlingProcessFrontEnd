export interface Installment {
    id?: number;
    customerId: number;
    name: string;
    mobile: string;
    email: string;
    outbill: number;
    duration: number;
    installmentAmount: number;
  }