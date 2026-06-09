import { type SubmitEvent, useState } from "react";
import { UserService } from "../../../lib/services/UserService";
import { NavLink, useNavigate } from "react-router";
import { Input } from "../../../components/Input";
import {useAuth} from "../../../lib/hooks/useAuth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser, setAccessToken } = useAuth();

  const handleFormSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError("");
    setIsLoading(true);

    UserService.register(name, email, password)
        .then((response) => {
          setUser(response.user);
          setAccessToken(response.access_token)
          navigate("/")
        })
      .catch((err: any) => {
        if (err.errors && typeof err.errors === "object") {
          // Format: { field: ["error message"] } -> { field: "error message" }
          const errors: Record<string, string> = {};
          for (const [field, messages] of Object.entries(err.errors)) {
            if (Array.isArray(messages)) {
              errors[field] = messages[0];
            }
          }
          setFieldErrors(errors);
        } else {
          setGeneralError(err.message || "Erreur lors de l'inscription");
        }
        setIsLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">S'inscrire</h1>
          <p className="text-neutral-400">Créez votre compte</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {generalError && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {generalError}
            </div>
          )}

          <Input
            type="text"
            label="Nom complet"
            placeholder="Jean Dupont"
            required
            maxLength={255}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={fieldErrors.name}
          />

          <Input
            type="email"
            label="Email"
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={fieldErrors.email}
          />

          <Input
            type="password"
            label="Mot de passe"
            placeholder="••••••••"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold rounded-lg transition-colors"
          >
            {isLoading ? "Inscription..." : "S'inscrire"}
          </button>

          <div className="text-center text-neutral-400 text-sm">
            Vous avez déjà un compte ?{" "}
            <NavLink to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Se connecter
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
