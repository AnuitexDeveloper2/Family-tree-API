import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { APIKeyAuthGuard } from "modules/auth/guards/api-key-auth.guard";
import { AppModule } from "./app.module";
import { ResponseInterceptor } from "interceptors/transform.interceptor";
import { UserAuthGuard } from "modules/auth/guards/user-auth.guard";
import * as dotenv from "dotenv";
import multipart from "@fastify/multipart";

dotenv.config();

async function bootstrap() {
  const httpAdapter = new FastifyAdapter({
    logger: {
      stream: {
        write: (message) => Logger.log(JSON.parse(message), "Fastify"),
      },
    },
    // bodyLimit: 124857600,
  });

  httpAdapter.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "*",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  Logger.log("😎 CORS enabled!", "bootstrap");

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    httpAdapter,
  );

  app.register(multipart);

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  Logger.log("😎 Global validation pipe initialized!", "bootstrap");

  app.useGlobalGuards(new UserAuthGuard());
  Logger.log(`😎 Global custom JWT auth guard initialized!`, `bootstrap`);

  const config = new DocumentBuilder()
    .setTitle("You project api")
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
    deepScanRoutes: true,
  });

  SwaggerModule.setup("api", app, document);
  Logger.log("😎 Swagger module initialized!", "bootstrap");

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  Logger.log("😎 Global validation pipe initialized!", "bootstrap");

  await app.listen(process.env.PORT, "0.0.0.0");
  Logger.log(
    `😎 Application is running on port ${process.env.PORT}`,
    "bootstrap",
  );
}

bootstrap();
