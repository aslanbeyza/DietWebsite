export interface Address {
    id?: number;
    address_line1: string;
    address_line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country: string;
    is_primary?: boolean;
    UserId?: number; 
}
