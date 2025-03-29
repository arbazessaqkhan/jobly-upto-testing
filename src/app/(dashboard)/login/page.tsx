"use client"
import {useState} from "react";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {CommonFields, SuccessResponse} from "@lib/util";
import {User} from "@/app/users.schema";

export default function Page() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Login attempt with:", { email, password, rememberMe })
        // Add your authentication logic here

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
        if (response.ok) {
            const user:  SuccessResponse<User & CommonFields>  = await response.json()
            console.log("User logged in:", user)
            toast.success("Login successfully");
            localStorage.setItem("email", user.data.email)
            router.push('/')
        } else {
            const error = await response.json()
            console.error("Login failed:", error)
            toast.error(error.message)
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="row w-100">
                <div className="col-md-6 col-lg-4 mx-auto">
                    <div className="card shadow">
                        <div className="card-body p-5">
                            <h2 className="card-title text-center mb-4">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">
                                        Remember me
                                    </label>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Sign in
                                    </button>
                                </div>
                                <div className="text-center mt-3">
                                    <a href="#" className="text-decoration-none">
                                        Forgot password?
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <p>
                            Don&#39;t have an account?{" "}
                            <a href="#" className="text-decoration-none">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
