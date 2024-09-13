import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function start() {
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || 5000;
    const globalPrefix = '/api';

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(globalPrefix);

    const config = new DocumentBuilder()
        .setTitle('Trello clone backend')
        .setDescription('Document REST API')
        .setVersion('1.0.0')
        .build();

    const documentPath = globalPrefix + '/docs';
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(documentPath, app, document);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(port, () => {
        console.log(`Server started!`);
        console.log(`Use http://${host}:${port}${documentPath} for get documentation`);
    });
}

start().then();
