import { BrowserAuthorizationClient } from "@itwin/browser-authorization";
import { environment } from "./environments/environment";
import { AccessToken } from "@itwin/core-bentley";
import { resolve } from "path";

export class AuthorizationService {
  private _client: BrowserAuthorizationClient;
  private _accessToken: AccessToken | undefined;

  constructor() {
    this._client = new BrowserAuthorizationClient(environment.authorization);
  }

  public async initialize(): Promise<void> {
    this._accessToken = await this._client.getAccessToken();
  }

  public async signIn(): Promise<any> {
    await this._client.signIn();
    console.log(this._client.hasSignedIn)
    // await this._client.handleSigninCallback();
    // return new Promise<boolean>((resolve, reject) => {
    //     this._client.onAccessTokenChanged.addOnce((token: string) =>
    //       resolve(token !== ''),
    //     );
    //     this._client.signIn().catch((err) => reject(err));
    //   });
  }

  public async signOut(): Promise<void> {
    await this._client.signOut();
  }

  public async getAccessToken(): Promise<AccessToken | undefined> {
    return this._accessToken;
  }
  public get signedIn():boolean {
    return this._client.hasSignedIn;
  }
  public readFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }
}