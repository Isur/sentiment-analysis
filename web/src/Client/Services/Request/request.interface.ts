export interface RequestService {
  basePath: string,
  get: <Res = unknown>(url: string) => Promise<Res>,
  post: <Res = unknown, Req = unknown>(url: string, data: Req) => Promise<Res>,
  patch: <Res = unknown, Req = unknown>(url: string, data: Req) => Promise<Res>,
  delete: <Res = unknown>(url: string) => Promise<Res>,
}
