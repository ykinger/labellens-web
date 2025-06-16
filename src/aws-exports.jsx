export default {
  Auth: {
    region: 'us-east-1', // Replace with your region
    userPoolId: 'us-east-1_xxxxxxxx',
    userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
    oauth: {
      domain: 'your-cognito-domain.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: 'http://localhost:3000/callback',
      redirectSignOut: 'http://localhost:3000/',
      responseType: 'code',
    },
  },
};