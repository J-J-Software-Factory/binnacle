import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlConfig } from '@nx-admin-starter/api/config';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<GraphqlConfig>('graphql');

        return {
          autoSchemaFile: join(process.cwd(), '/schema.gql'),
          sortSchema: config?.sortSchema,
          debug: config?.debug,
          playground: config?.playground,
          introspection: config?.introspection,
          installSubscriptionHandlers: config?.installSubscriptionHandlers,
          context: ({ req }: { req: unknown }) => ({ req }),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class GqlProviderModule {}
