const baseURL = "http://api:9000"
//SUPONDO QUE O USUARIO ESTA LOGADO E GEROU ESSE JWT AS CHAMADAS PARA A API SO FUNCIONARAO NO CASO DO ENVIO DO TOKEN
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTc3NzAzNDksImRhdGEiOnsiYXBpIjoibmV4dXMiLCJzZWNvbmRBcGkiOiJub2RlIn19.L6K-AxNvmY_PR2hcZyNmtUlPJm-cAsJCxU5erV1XMHo'

export async function api(
    endpoint, options
) {
    let defaultHeaders = {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    }
    defaultHeaders['Authorization'] = `Bearer ${token}`
    const { headers: customHeaders, ...otherOptions } = options
    const finalOptions = {
        ...otherOptions,
        headers: {
            ...defaultHeaders,
            ...customHeaders,
        },
    }

    const response = await fetch(`${baseURL}${endpoint}`, finalOptions)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json()
}