interface AuthMiddlewareRouteOptions{

    requiresAuth: boolean
    redirect: string

}

interface ModuleOptions{

    baseURL: string
}

export { type AuthMiddlewareRouteOptions, type ModuleOptions}