export interface HttpRequestOptions {
    json?: boolean
}

export interface IHttpClient {
    get: (url: string, options?: HttpRequestOptions) => Promise<string>
    post: (url: string, body: unknown, options?: HttpRequestOptions) => Promise<string>
}

export class HttpClient implements IHttpClient {
    constructor(private readonly baseHeaders: Record<string, string> = {}) {}

    private handleResponse = async (response: Response, options?: HttpRequestOptions): Promise<string> => {
        if (!response.ok) {
            let errorData: unknown
            try {
                errorData = await response.json()
            } catch {
                errorData = await response.text()
            }

            console.error(`HTTP Error: ${response.status} - ${response.url}`, {
                status: response.status,
                statusText: response.statusText,
                data: errorData
            })

            throw new Error(`Request failed with status: ${response.status}, error data: ${errorData}`)
        }

        console.log(`HTTP Success: ${response.status} - ${response.url}`)

        if (options?.json || this.isJsonResponse(response)) {
            return response.json()
        }

        return response.text()
    }

    private isJsonResponse = (response: Response): boolean => {
        const contentType = response.headers.get('content-type')
        return contentType?.includes('application/json') ?? false
    }

    get = async (url: string, options?: HttpRequestOptions): Promise<string> => {
        console.log(`HTTP GET Request: ${url}`, { options })

        const response = await fetch(url, {
            method: 'GET',
            headers: this.baseHeaders
        })

        return this.handleResponse(response, options)
    }

    post = async (url: string, _body: unknown, options?: HttpRequestOptions): Promise<string> => {
        console.log(`HTTP POST Request: ${url}`, { body: _body, options })

        const body = typeof _body === 'string' ? _body : JSON.stringify(_body)

        const response = await fetch(url, {
            method: 'POST',
            headers: this.baseHeaders,
            body
        })

        return this.handleResponse(response, options)
    }
}

export class UserHttpClient extends HttpClient {
    constructor(private readonly userId: string) {
        super({
            'X-User-Id': userId
        })
    }
}
