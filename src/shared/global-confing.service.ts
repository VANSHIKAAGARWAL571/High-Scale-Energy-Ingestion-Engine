import { Injectable } from "@nestjs/common";
import { EnvDto } from "./dto/env.dto";
import { plainToClass, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";


@Injectable()
export class GlobalConfigService {
    envConfig: EnvDto;

    constructor(){
        const config = plainToInstance(EnvDto, process.env);
        const errors = validateSync(config, {
            skipMissingProperties: false
        });
        if(errors.length > 0){
            throw new Error(errors.toString());
        }
        this.envConfig = config;
    }

    get env(): EnvDto{
        return this.envConfig;
    }
}