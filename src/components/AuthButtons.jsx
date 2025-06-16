import { signInWithRedirect, signOut } from '@aws-amplify/auth';

function AuthButtons() {
  return (
    <div>
      <button
        onClick={() => signInWithRedirect()}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Login / Signup
      </button>
      <br /><br />
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default AuthButtons;