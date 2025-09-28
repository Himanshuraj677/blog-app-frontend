import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { ac, APP_ROLES } from "./permission"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_AUTH_URL as string,
    plugins: [
        adminClient({
            ac,
            roles: APP_ROLES
        })
    ]
})