import { Link } from 'react-router-dom';

export function About() {
  return (
    <div>
      <h2>About Page</h2>
      <p>This is the about page.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default About;
