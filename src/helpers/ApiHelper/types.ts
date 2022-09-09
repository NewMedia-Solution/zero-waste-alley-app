export type ReturnType = {
  response: any
  json: any
}

export type Get = (path: string) => Promise<ReturnType>

export type Params = {
  method: string
  headers: { [key: string]: string }
  body?: string
}

export type Post = (path: string, body?: string) => Promise<ReturnType>
