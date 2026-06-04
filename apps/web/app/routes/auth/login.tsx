import { type SubmitEvent, useState } from "react";
import { UserService } from "../../../lib/services/UserService";
import {NavLink, useNavigate} from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleFormSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    UserService.login(email, password).then(() => navigate("/"));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Se connecter</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="name@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="********"
          required
          min={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>

        <NavLink to="/register">Créer un compte</NavLink>
      </form>
    </div>
  );
}
