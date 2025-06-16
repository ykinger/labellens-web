import './styles/index.css'; // Tailwind
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

function App() {
  return null; // or remove this file entirely if not used
}

export default App;
