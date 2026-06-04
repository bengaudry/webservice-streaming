import {type SubmitEvent, useState} from "react";
import {UserService} from "../../../lib/services/UserService";
import {useNavigate} from "react-router"

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const handleFormSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        UserService.register(name, email, password).then(() => navigate("/")).catch(error => console.log(error));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">S'inscrire </h1>

            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Jean Dupont"
                    required
                    maxLength={255}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}
