import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication System (e2e)', async () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST - /auth/signup', async () => {
    const email = 'ahmed12@ahmed.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password: 'password',
      })
      .expect(201)
      .then((res) => {
        expect(res.body).toBeDefined();

        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toBeDefined();
        expect(email).toBe(email);
      });
  });
  // it('POST - /auth/signup', async () => {
  //   const email = 'ahmed12@ahmed.com';
  //   return request(app.getHttpServer())
  //     .post('/auth/signup')
  //     .send({
  //       email,
  //       password: 'password',
  //     })
  //     .expect(201)
  //     .then((res) => {
  //       expect(res.body).toBeDefined();

  //       const { id, email } = res.body;
  //       expect(id).toBeDefined();
  //       expect(email).toBeDefined();
  //       expect(email).toBe(email);
  //     });
  // });
});
