import { Global, Module } from '@nestjs/common';
import { GlobalConfigService } from './global-confing.service';

@Global()
@Module({
    providers: [GlobalConfigService],
    exports: [GlobalConfigService]
})
export class SharedModule {}
