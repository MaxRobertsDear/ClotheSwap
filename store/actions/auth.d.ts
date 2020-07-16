interface iAuthenticate {
  userId: string;
  token: string;
  expiryTime: number;
}

interface iSignup {
  email: string;
  password: string;
}

export { iAuthenticate, iSignup }