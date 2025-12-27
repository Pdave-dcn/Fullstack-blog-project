export interface JwtService {
  sign(payload: object): string;
}
