import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        localStorage.setItem("username", username)
        navigate("/chat")
    }

    return (
        <>
            <div className="relative flex items-center justify-center w-screen min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/path-to-background-image.jpg')" }}>
                <div className="backdrop-blur-md bg-black bg-opacity-60 p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
                    <h1 className="text-4xl font-bold text-center text-white mb-8">
                        Welcome Back
                    </h1>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center">
                            <label className="label justify-center">
                                <span className="text-lg label-text text-gray-300">Username</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="w-full px-4 py-2 input input-bordered input-accent rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition duration-200"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-accent w-full mt-4 py-3 rounded-full text-lg text-white font-semibold transition duration-300 ease-in-out transform hover:bg-accent-focus hover:scale-105 shadow-lg">
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
