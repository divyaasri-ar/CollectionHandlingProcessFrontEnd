export interface OtpResponseDto {
    status: OtpStatus;
    message: string;
}

export enum OtpStatus {
    DELIVERED = 'DELIVERED',
    FAILED = 'FAILED'
}
