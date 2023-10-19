export interface Payment {
    id?: number;
    customerId: number;
    paymentMethod: string;
    amount: number;
    paynumber: string;
    email: string;


}