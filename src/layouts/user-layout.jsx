import * as React from 'react'
import { useAuth, useUser } from "@clerk/clerk-react"
import { Outlet, useNavigate } from "react-router-dom"

export default function AdminLayout() {
    const { userId, isLoaded, isSignedIn } = useAuth()
    const { user } = useUser();
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!userId) {
            navigate("/signIn")
        }
        else if (userId && user.publicMetadata.role == "admin" && !isSignedIn) {
            navigate("/admin")
        }
    }, [])

    if (!isLoaded) return "Loading..."

    return (
        <Outlet />
    )
}