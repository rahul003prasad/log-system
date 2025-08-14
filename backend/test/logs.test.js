const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const app = require('../server'); 

describe('Log Ingestion API Tests', function () {

  describe('POST /logs', function () {
    it('should create a new log and respond with 201', async () => {
      const logData = {
        level: "info",
        message: "Test log entry",
        resourceId: "resource_1",
        traceId: "trace_123",
        spanId: "span_456",
        commit: "commit_hash"
      };

      const res = await request(app)
        .post('/logs')
        .send(logData);
      expect(res.status).to.equal(201);
      expect(res.body).to.include.keys('timestamp', 'level', 'message', 'resourceId');
    });

    it('should return 400 for invalid log data', async () => {
      const invalidLog = { level: null };

      const res = await request(app)
        .post('/logs')
        .send(invalidLog);
      // Assuming actual server validates and replies 400 for invalid data
      expect(res.status).to.equal(400);
    });
  });

  describe('GET /logs', function () {
    it('should get logs with 200 status', async () => {
      const res = await request(app).get('/logs');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });

    it('should filter logs by level', async () => {
      const res = await request(app).get('/logs').query({ level: 'INFO' });
      expect(res.status).to.equal(200);
      expect(res.body.every(log => log.level === 'INFO')).to.be.true;
    });
  });
});

describe('Extended log filtering tests', function () {

  it('should filter logs by message substring', async () => {
    const res = await request(app).get('/logs').query({ message: 'test' });
    expect(res.status).to.equal(200);
    expect(res.body.every(log => log.message.toLowerCase().includes('test'))).to.be.true;
  });

  it('should filter logs by resourceId', async () => {
    const res = await request(app).get('/logs').query({ resourceId: 'resource_1' });
    expect(res.status).to.equal(200);
    expect(res.body.every(log => log.resourceId === 'resource_1')).to.be.true;
  });

  it('should filter logs by timestamp range', async () => {
    // Pick a range that logically includes some logs
    const res = await request(app).get('/logs').query({
      timestamp_start: '2025-01-01T00:00:00Z',
      timestamp_end: '2026-01-01T00:00:00Z'
    });
    expect(res.status).to.equal(200);
    expect(res.body.every(log => {
      const ts = new Date(log.timestamp);
      return ts >= new Date('2025-01-01T00:00:00Z') && ts <= new Date('2026-01-01T00:00:00Z');
    })).to.be.true;
  });
  
  it('should filter logs by traceId, spanId and commit (if supported)', async () => {
    const traceRes = await request(app).get('/logs').query({ traceId: 'trace_123' });
    expect(traceRes.status).to.equal(200);
    expect(traceRes.body.every(log => log.traceId === 'trace_123')).to.be.true;

    const spanRes = await request(app).get('/logs').query({ spanId: 'span_456' });
    expect(spanRes.status).to.equal(200);
    expect(spanRes.body.every(log => log.spanId === 'span_456')).to.be.true;

    const commitRes = await request(app).get('/logs').query({ commit: 'commit_hash' });
    expect(commitRes.status).to.equal(200);
    expect(commitRes.body.every(log => log.commit === 'commit_hash')).to.be.true;
  });

  it('should handle combined filters correctly', async () => {
    const res = await request(app).get('/logs').query({
      message: 'test',
      level: 'info',
      resourceId: 'resource_1'
    });
    expect(res.status).to.equal(200);
    expect(res.body.every(log =>
      log.message.toLowerCase().includes('test') &&
      log.level === 'info' &&
      log.resourceId === 'resource_1'
    )).to.be.true;
  });

});

describe('POST /logs validation edge cases', function () {

  it('should return 400 if level is missing', async () => {
    const res = await request(app).post('/logs').send({
      message: 'Missing level',
      resourceId: 'resource_1'
    });
    expect(res.status).to.equal(400);
  });

  it('should return 400 if level is invalid', async () => {
    const res = await request(app).post('/logs').send({
      level: 'invalid_level',
      message: 'Invalid level',
      resourceId: 'resource_1'
    });
    expect(res.status).to.equal(400);
  });

  it('should return 400 if message is missing', async () => {
    const res = await request(app).post('/logs').send({
      level: 'info',
      resourceId: 'resource_1'
    });
    expect(res.status).to.equal(400);
  });

  it('should return 400 if resourceId is missing', async () => {
    const res = await request(app).post('/logs').send({
      level: 'info',
      message: 'Missing resourceId'
    });
    expect(res.status).to.equal(400);
  });

  it('should accept optional fields missing (traceId, spanId, commit, metadata)', async () => {
    const res = await request(app).post('/logs').send({
      level: 'info',
      message: 'Optional fields missing',
      resourceId: 'resource_1'
    });
    expect(res.status).to.equal(201);
  });

});

describe('Edge cases and error testing', function () {

  it('should return 400 for empty payload', async () => {
    const res = await request(app).post('/logs').send({});
    expect(res.status).to.equal(400);
  });

  it('should handle large payloads gracefully', async () => {
    const largeMessage = 'a'.repeat(10000);
    const res = await request(app).post('/logs').send({
      level: 'info',
      message: largeMessage,
      resourceId: 'resource_1'
    });
    expect(res.status).to.equal(201);
    expect(res.body.message.length).to.equal(10000);
  });

  
});

describe('Concurrency tests', function () {
  it('should handle multiple concurrent log posts', async () => {
    const payloads = [
      { level: 'info', message: 'Concurrent 1', resourceId: 'r1' },
      { level: 'warn', message: 'Concurrent 2', resourceId: 'r2' },
      { level: 'error', message: 'Concurrent 3', resourceId: 'r3' }
    ];

    const promises = payloads.map(p => request(app).post('/logs').send(p));
    const results = await Promise.all(promises);

    results.forEach(res => {
      expect([201, 400]).to.include(res.status);
    });
  });
});

