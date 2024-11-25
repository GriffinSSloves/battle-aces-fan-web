const getEnvVariable = (key: string): string => {
    const value = import.meta.env[key] || process.env[key]

    if (!value) {
        throw new Error(`Environment variable ${key} is not defined`)
    }

    return value
}

export const AceConfig = {
    apiUrl: getEnvVariable('BACKEND_URL')
}
