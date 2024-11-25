const getEnvVariable = (key: string): string => {
    const value = import.meta.env[key]

    if (!value) {
        throw new Error(`Environment variable ${key} is not defined`)
    }

    return value
}

export const AceConfig = {
    apiUrl: getEnvVariable('VITE_BACKEND_URL')
}
