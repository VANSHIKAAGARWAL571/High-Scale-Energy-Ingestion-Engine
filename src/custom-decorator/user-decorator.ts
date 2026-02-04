import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const User = createParamDecorator((data: unknown, ctc: ExecutionContext)=>{
    const request = ctc.switchToHttp().getRequest();
    return request.user;
})