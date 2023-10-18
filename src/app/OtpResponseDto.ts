export interface OtpResponseDto {
    otp: any;
    status: OtpStatus;
    message: string;
}

export enum OtpStatus {
    DELIVERED = 'DELIVERED',
    FAILED = 'FAILED'
}
