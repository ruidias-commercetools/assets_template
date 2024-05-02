import { useState } from "react";

const VITE_AUTH_HOST = import.meta.env.VITE_AUTH_HOST;
const VITE_PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;
const VITE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const VITE_CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://${VITE_AUTH_HOST}/oauth/${VITE_PROJECT_KEY}/customers/token`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${btoa(
              `${VITE_CLIENT_ID}:${VITE_CLIENT_SECRET}`
            )}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "password",
            username: username,
            password: password,
            scope: `manage_project:${VITE_PROJECT_KEY}`,
          }),
        }
      );

      const dataJSON = await response.json();
      setData(dataJSON);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="centered-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login into commercetools api</h2>
        <label>Username:</label>
        <input
          type="text"
          autoComplete="current-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {data && (
        <div className="response">
          <h2>Response:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div className="error">
          <h2>Error:</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Login;
