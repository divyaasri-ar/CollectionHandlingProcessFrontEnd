export interface Ticket {
        id?: number;
        customerId: number;
        selectedIssue: string;
        otherIssue: string;
        selectedPriority: string;
        email: string;
  }