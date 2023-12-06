import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        await login(email, password);
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label>Email: </label>
            <input 
                type="email"
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
            />
            <label>Password: </label>
            <input 
                type="password"
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading}>Login</button>
            <p>Don't have an account yet?</p>
            <Link className="link" to="/signup">Sign up here!</Link>
            {error && <div className="error">{error}</div>}
        </form>
    );
}
 
export default Signup;