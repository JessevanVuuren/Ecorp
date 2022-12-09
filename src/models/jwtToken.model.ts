export class JwtToken {

  constructor(
    public defaultPass: boolean,
    public sub: string,
    public role: string,
    public name: string,
    public iss: string,
    public id: number,
    public iat: number,
    public email: string,
  ) { }
}
