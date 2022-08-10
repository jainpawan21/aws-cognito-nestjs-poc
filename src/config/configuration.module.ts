import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ConfigurationService } from './configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [ConfigService, ConfigurationService],
  exports: [ConfigurationService, ConfigService],
})
export class ConfigurationModule {}
