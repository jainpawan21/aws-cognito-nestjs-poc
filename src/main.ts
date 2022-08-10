import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigurationService } from './config/configuration.service';
import * as bodyParser from 'body-parser';
import { setEnvironmentVariables } from './config/environment.service';

async function bootstrap() {
  try {
    await setEnvironmentVariables();
  } catch (error) {
    console.error(error);
    process.exit();
  }
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();
  const configService = app.get(ConfigurationService);

  let port;
  try {
    port = configService.appPort;
  } catch (e) {
    console.log(port);
    port = 3000;
  }
  await app.listen(port, () => {
    console.info(`Server listening on PORT: ${port}`);
  });
}
bootstrap();
