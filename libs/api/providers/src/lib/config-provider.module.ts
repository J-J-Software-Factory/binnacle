import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '@nx-admin-starter/api/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
})
export class ConfigProviderModule {}
