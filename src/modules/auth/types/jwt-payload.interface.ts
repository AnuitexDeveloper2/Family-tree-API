export interface JWTPayload {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    sub: string;
    iat: number;
    exp: number;
  }
  