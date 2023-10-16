export interface pendcustomer {
    id: number;
    name: string;
    mobileNo: string;
    email: string;
    outstandingBill: number;
    dueDate: string; // Assuming due date is a string, you can also use Date type
    daysUnpaid: number;
  }