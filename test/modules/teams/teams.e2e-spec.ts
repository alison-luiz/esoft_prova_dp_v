import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

describe('Teams e2e' , () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const body = {
      email: 'test@user.com',
      password: 'test@123',
    };

    const loginResponse = await request(app.getHttpServer())
      .post('/login')
      .send(body);

    token = loginResponse.body.access_token;
  });

  it('/teams (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/teams')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

      expect(response.body).toBeDefined();

  });

});
