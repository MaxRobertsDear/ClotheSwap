interface iAuthenticate {
  userId: string;
  token: string;
  expiryTime: number;
}

interface iSignup {
  email: string;
  password: string;
}
interface iLogin {
  email: string;
  password: string;
}

interface iSaveDataToStorage {
  token: string;
  userId: string;
  expirationDate: Date;
}

export { iAuthenticate, iSignup, iLogin, iSaveDataToStorage }
