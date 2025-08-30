import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { ac, APP_ROLES } from "./permission"

export const authClient = createAuthClient({
    baseURL: "http://localhost:5001",
    plugins: [
        adminClient({
            ac,
            roles: APP_ROLES
        })
    ]
})