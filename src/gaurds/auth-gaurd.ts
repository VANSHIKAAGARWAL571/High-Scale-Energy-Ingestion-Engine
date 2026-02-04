import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";


@Injectable()
export class AuthGaurd implements CanActivate{
    canActivate(ctx : ExecutionContext): boolean {
        const user = 'Sample User';
        const request = ctx.switchToHttp().getRequest();
        return request.user === user;
    }
}