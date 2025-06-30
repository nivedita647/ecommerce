import { Request, Response, NextFunction } from "express";

export interface request extends Request {
    endpoint?: string,
    decodedrole?: string,
    useremail: string
}

export type MiddlewareFunc = (req: Request | request, res: Response, next: NextFunction) => void