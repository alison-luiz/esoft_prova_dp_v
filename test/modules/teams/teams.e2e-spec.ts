import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

describe('Teams e2e', () => {
  function createTeamsMock() {
    return {
      name: `Test Team ${new Date().getTime()}`,
      abbreviation: 'TST',
      slug: 'test-team',
      nickname: 'Testers',
      shield: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/FC_Barcelona_logo.svg',
    };
  }

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
    const pageSize = 100;
    let currentPage = 1;
    let totalTeams = 0;
    let lastPage = 1;

    do {
      const getTeamsResponse = await request(app.getHttpServer())
        .get('/teams')
        .query({ page: currentPage, limit: pageSize, createdBy: userId })
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

        const teams = getTeamsResponse.body.data || [];
        const meta = getTeamsResponse.body.meta || {};
        totalTeams = meta.total || 0;
        lastPage = meta.last_page || 1;

        if (teams.length > 0) {
          await Promise.all(
            teams.map((team) =>
              request(app.getHttpServer())
                .delete(`/teams/${team.id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200),
            ),
          );
        }

        currentPage++;
    } while (currentPage <= lastPage);
  });

  it('Should fetch the list of teams', async () => {
    const response = await request(app.getHttpServer())
      .get('/teams')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toBeDefined();
  });

  it('Should search for the list of teams with at least one team', async () => {
    const body = createTeamsMock();

    const createResponse = await request(app.getHttpServer())
      .post('/teams')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(201);
    expect(createResponse.body).toBeDefined();

    const getTeams = await request(app.getHttpServer())
      .get('/teams')
      .query({ search: body.name })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(getTeams.body).toBeDefined();

    const teams = getTeams.body.data || [];
    expect(teams.length).toBeGreaterThan(0);

    const team = teams.find((t) => t.name === body.name);
    expect(team).toBeDefined();

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/teams/${team.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(deleteResponse.body).toBeDefined();
  });

  it('Should search for a team by id', async () => {
    const body = createTeamsMock();

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
    const body = createTeamsMock();

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
    const body = createTeamsMock();

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
      .send(createTeamsMock())
      .expect(200);
    expect(updateResponse.body).toBeDefined();

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/teams/${team.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(deleteResponse.body).toBeDefined();
  });

  it('Should delete a team', async () => {
    const body = createTeamsMock();

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
