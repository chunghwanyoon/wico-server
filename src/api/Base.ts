import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class BaseAPISpecifications {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder.setTitle('WINTERISCOMING API SERVER').setDescription('WINTER IS COMING').setVersion('1.0').build();
  }
}
