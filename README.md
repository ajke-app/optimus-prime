```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { StatsDInterceptor } from 'optimus-prime';

@Module({
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useValue: new StatsDInterceptor({
        method: true,
        path: true,
        protocol: true,
        responseCode: true,
      }),
    },
],
})
export class AppModule {}
```
