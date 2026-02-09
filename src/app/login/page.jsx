"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./login.css";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(data.message);
                // Clear form (optional)
                setEmail("");
                setPassword("");
                router.push("/home")
            } else {
                setMessage(data.error);
            }
        } catch (err) {
            setMessage("Something went wrong");
        }
    };
    return (
        <div className="container">

            {/* LEFT PANEL */}
            <div className="overlay">
                <h1>Hello, Friend!</h1>
                <p>
                    Enter your personal details <br />
                    and start your journey with us
                </p>

                <a href="/register">
                    <button>SIGN UP</button>
                </a>
            </div>

            {/* RIGHT PANEL */}
            <div className="form-box">
                <h1>Sign In</h1>

                <div className="social-icons">
                    <span>f</span>
                    <span>G+</span>
                    <span>in</span>
                </div>

                <p>or use your email account</p>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </span>
                </div>

                <button className="signin-btn" onClick={handleLogin}>SIGN IN</button>
                {message && (
                    <p style={{ color: message.includes("successful") ? "green" : "red" }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
