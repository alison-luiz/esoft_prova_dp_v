import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

describe('Teams e2e', () => {
  const createTeamsMock = {
    name: 'Santos FC Teste',
    abbreviation: 'SAN',
    slug: 'santos-fc',
    nickname: 'Peixe',
    shield:
      'https://upload.wikimedia.org/wikipedia/commons/1/1c/Santos_logo.svg',
  };

  let app: INestApplication;
  let token: string;
  let userId: string;

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
    userId = loginResponse.body.user.id;
  });

  afterAll(async () => {
    const getTeamsResponse = await request(app.getHttpServer())
      .get('/teams')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const teams = getTeamsResponse.body.filter(
      (team) => team.created_by === userId,
    );

    await Promise.all(
      teams.map((team) =>
        request(app.getHttpServer())
          .delete(`/teams/${team.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200),
      ),
    );
  });

  it('Should fetch the list of teams', async () => {
    const response = await request(app.getHttpServer())
      .get('/teams')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toBeDefined();
  });

  it('Should search for the list of teams with at least one team', async () => {
    const body = createTeamsMock;

    const createResponse = await request(app.getHttpServer())
      .post('/teams')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(201);
    expect(createResponse.body).toBeDefined();

    const getTeams = await request(app.getHttpServer())
      .get('/teams')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(getTeams.body).toBeDefined();
    expect(getTeams.body.length).toBeGreaterThan(0);

    const team = getTeams.body.find((t) => t.name === createTeamsMock.name);
    expect(team).toBeDefined();

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/teams/${team.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(deleteResponse.body).toBeDefined();
  });

  it('Should search for a team by id', async () => {
    const body = createTeamsMock;

    const createResponse = await request(app.getHttpServer())
      .post('/teams')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(201);
    expect(createResponse.body).toBeDefined();

    const team = createResponse.body;

    const getTeam = await request(app.getHttpServer())
      .get(`/teams/${team.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(getTeam.body).toBeDefined();

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/teams/${team.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(deleteResponse.body).toBeDefined();
  });

  it('Should create a team', async () => {
    const body = createTeamsMock;

    const response = await request(app.getHttpServer())
      .post('/teams')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(201);

    expect(response.body).toBeDefined();

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/teams/${response.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(deleteResponse.body).toBeDefined();
  });

  it('Should update a team', async () => {
    const body = createTeamsMock;

    const createResponse = await request(app.getHttpServer())
      .post('/teams')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(201);
    expect(createResponse.body).toBeDefined();

    const team = createResponse.body;

    const updateResponse = await request(app.getHttpServer())
      .patch(`/teams/${team.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(createTeamsMock)
      .expect(200);
    expect(updateResponse.body).toBeDefined();

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/teams/${team.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(deleteResponse.body).toBeDefined();
  });

  it('Should delete a team', async () => {
    const body = createTeamsMock;

    const createResponse = await request(app.getHttpServer())
      .post('/teams')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(201);
    expect(createResponse.body).toBeDefined();

    const team = createResponse.body;

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/teams/${team.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(deleteResponse.body).toBeDefined();
  });
});
