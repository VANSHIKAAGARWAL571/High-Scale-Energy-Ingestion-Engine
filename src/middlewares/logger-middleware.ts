import { Logger } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


export function loggerMiddleware(req: Request, _res: Response, next: NextFunction){
    const logger = new Logger('LoggerMiddleware');
    logger.debug(`Request... ${req.method} ${req.originalUrl}`);
    next();
}    