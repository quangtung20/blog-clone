import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ShareService } from './share.service';

@Module({
  imports:[
  ],
  providers: [ShareService],
  exports:[
    ShareService
  ]
})
export class ShareModule {}
