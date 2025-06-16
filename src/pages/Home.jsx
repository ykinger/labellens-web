import AuthButtons from '../components/AuthButtons';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to LabelLens</h1>
      <AuthButtons />
      <div className="mt-4">
        <Link to="/protected" className="text-blue-600 underline">Go to Protected Page</Link>
      </div>
    </div>
  );
}

export default Home;