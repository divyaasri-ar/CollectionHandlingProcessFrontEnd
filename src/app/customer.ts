export interface Customer {
    id: number;
    name: string;
    mobile: string;
    email: string;
    duedate: Date;
    prevdue: number;
    currdue: number;
    outbill: number;
    status: string;
  }