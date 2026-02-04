import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

declare global{
    namespace Express{
        interface Request{
            user?: any;
        }
    }
}

export class SampleMiddleware implements NestMiddleware{
    use(req: Request, _res: Response, next: NextFunction){
        req.user = 'Sample User';
        next();
    }
}