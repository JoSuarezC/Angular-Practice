export class AuthService {
  loggedIn: boolean = false;

  isAuthenticated(): Promise<boolean> {
    const promise: Promise<boolean> = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 0)
      }
    );

    return promise;
  }

  login(): void {
    this.loggedIn = true;
  }

  logout(): void {
    this.loggedIn = false;
  }
}