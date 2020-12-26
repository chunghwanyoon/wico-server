import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class BaseAPISpecifications {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder.setTitle('WINTERISCOMING API SERVER').setDescription('스트리머들을 위한 OPEN API 서비스').setVersion('1.0').build();
  }
}
