"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./register.css";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setMessage("");
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
            setMessage(
                "Password must be at least 6 characters, include uppercase, lowercase and a number"
            );
            return;
        }
        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(data.message);
                // Clear form
                setName("");
                setEmail("");
                setPassword("");
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
                <h1>Welcome Back!</h1>
                <p>
                    To keep connected with us <br />
                    please login with your personal info
                </p>
                <button onClick={() => router.push("/login")}>SIGN IN</button>
            </div>

            {/* RIGHT PANEL */}
            <div className="form-box">
                <h1>Create Account</h1>

                <div className="social-icons">
                    <span>f</span>
                    <span>G+</span>
                    <span>in</span>
                </div>

                <p>or use your email for registration</p>

                {/* Inputs connected to state */}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <button className="signup-btn" onClick={handleSignUp}>
                    SUBMIT
                </button>

                {/* Message alert */}
                {message && (
                    <p
                        style={{
                            marginTop: "15px",
                            color: message.includes("successfully") ? "green" : "red",
                        }}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
