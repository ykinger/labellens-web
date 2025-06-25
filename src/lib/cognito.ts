import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand, ConfirmSignUpCommand, GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";

const region = "ca-central-1";
const userPoolId = "ca-central-1_uAq6Jtdag";
const clientId = "2keiap94nj865hbfr745nq4clu";

const cognitoClient = new CognitoIdentityProviderClient({ region });

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface CognitoUser {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
}

export class CognitoAuth {
  async signUp(data: SignUpData) {
    const command = new SignUpCommand({
      ClientId: clientId,
      Username: data.email,
      Password: data.password,
      UserAttributes: [
        { Name: "email", Value: data.email },
        { Name: "given_name", Value: data.firstName },
        { Name: "family_name", Value: data.lastName },
        ...(data.company ? [{ Name: "custom:company", Value: data.company }] : [])
      ]
    });

    try {
      const response = await cognitoClient.send(command);
      return response;
    } catch (error) {
      throw new Error(`Sign up failed: ${error.message}`);
    }
  }

  async signIn(data: SignInData) {
    const command = new InitiateAuthCommand({
      ClientId: clientId,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: data.email,
        PASSWORD: data.password
      }
    });

    try {
      const response = await cognitoClient.send(command);
      if (response.AuthenticationResult?.AccessToken) {
        localStorage.setItem('accessToken', response.AuthenticationResult.AccessToken);
        localStorage.setItem('idToken', response.AuthenticationResult.IdToken || '');
        localStorage.setItem('refreshToken', response.AuthenticationResult.RefreshToken || '');
      }
      return response;
    } catch (error) {
      throw new Error(`Sign in failed: ${error.message}`);
    }
  }

  async getCurrentUser(): Promise<CognitoUser | null> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return null;

    const command = new GetUserCommand({
      AccessToken: accessToken
    });

    try {
      const response = await cognitoClient.send(command);
      const attributes = response.UserAttributes || [];
      
      const getAttribute = (name: string) => 
        attributes.find(attr => attr.Name === name)?.Value || '';

      return {
        sub: getAttribute('sub'),
        email: getAttribute('email'),
        firstName: getAttribute('given_name'),
        lastName: getAttribute('family_name'),
        company: getAttribute('custom:company')
      };
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('idToken');
      localStorage.removeItem('refreshToken');
      return null;
    }
  }

  signOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}

export const cognitoAuth = new CognitoAuth();
