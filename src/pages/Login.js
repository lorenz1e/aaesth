import React, { useState, useTransition } from 'react'
import { Spinner } from 'react-activity'
import { FIREBASE_AUTH } from '../firebase/firebase'
import { Navigate } from 'react-router-dom'
import { signIn } from '../firebase/auth'

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    if (FIREBASE_AUTH.currentUser) {
        return <Navigate to={`/${FIREBASE_AUTH.currentUser.displayName}`} />
    }

    const handleLogin = async () => {
        setLoading(true)
        try {
            await signIn(email, password)
            setLoading(false)
        } catch(error) {
            setError(error)
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col h-[100vh] justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <div className="text-2xl font-bold">Login to your account</div>
                <div className="flex text-lg">
                    Enter email and password
                </div>
                <div className='flex flex-col w-72 mt-10'>
                    <div className='flex flex-col mt-5'>
                        <input
                            className="bg-gray-200 px-5 py-2 mb-2 outline-none rounded-xl"
                            value={email}
                            placeholder='E-Mail'
                            onChange={(input) => setEmail(input.target.value)}
                        />
                        <input
                            className="bg-gray-200 px-5 py-2 mb-4 outline-none rounded-xl"
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={(input) => setPassword(input.target.value)}
                        />
                        <button className="bg-black text-white px-5 py-3 mt-6 rounded-xl flex justify-center" onClick={handleLogin}>
                            {loading ? <Spinner /> : "Login"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-red-500 flex justify-center">
                {error && `❌ ${error}`}
            </div>
        </div>
    )
}
