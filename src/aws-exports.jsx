export default {
  Auth: {
    region: 'ca-central-1', // Replace with your region
    userPoolId: 'ca-central-1_uAq6Jtdag',
    userPoolWebClientId: '2keiap94nj865hbfr745nq4clu',
    oauth: {
      domain: 'labellens.auth.ca-central-1.amazoncognito.com',
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: 'http://localhost:3000/callback',
      redirectSignOut: 'http://localhost:3000/',
      responseType: 'code',
    },
  },
};