import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { ChallengesModule } from './challenges/challenges.module';
import { ContentsModule } from './contents/contents.module';
import { UsersModule } from './users/users.module';

import { DevtoolsModule } from '@nestjs/devtools-integration';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '',
      password: '',
      database: 'popit-codingtask',
      autoLoadEntities: true,
      synchronize: true,
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    UsersModule,
    ChallengesModule,
    ContentsModule,
    CommentsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
