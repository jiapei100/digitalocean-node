'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('domain record endpoints', function() {
  describe('list', function() {
    var data = {
      "domain_records": [
        {
          "id": 3352892,
          "type": "NS",
          "name": "@",
          "data": "ns1.digitalocean.com",
          "priority": null,
          "port": null,
          "weight": null
        }
      ],
      "links": {
      },
      "meta": {
        "total": 1
      }
    };

    it('returns domain records', function() {
      testUtils.api.get('/v2/domains/example.com/domain_records').reply(200, JSON.stringify(data));

      client.domainRecords.list('example.com', function(err, domainRecords, headers) {
        expect(domainRecords).to.be.eql(data.domain_records);
      });
    });

    it('returns domain records at page', function() {
      testUtils.api.get('/v2/domains/example.com/domain_records?page=2').reply(200, JSON.stringify(data));

      client.domainRecords.list('example.com', 2, function(err, domainRecords, headers) {
        expect(domainRecords).to.be.eql(data.domain_records);
      });
    });

    it('returns domain records at page with length', function() {
      testUtils.api.get('/v2/domains/example.com/domain_records?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.domainRecords.list('example.com', 2, 1, function(err, domainRecords, headers) {
        expect(domainRecords).to.be.eql(data.domain_records);
      });
    });
  });

  describe('create', function() {
    var data = {
      "domain_record": {
        "id": 123,
        "type": "A",
        "name": "www",
        "data": "162.10.66.0",
        "priority": null,
        "port": null,
        "weight": null
      }
    };

    it('creates the domain record', function() {
      var attributes = {
        "type": "A",
        "name": "www",
        "data": "162.10.66.0"
      };

      testUtils.api.post('/v2/domains/example.com/domain_records', attributes).reply(201, data);

      client.domainRecords.create('example.com', attributes, function(err, domainRecord, headers) {
        expect(domainRecord).to.be.eql(data.domain_record);
      });
    });
  });

  describe('get', function() {
    var data = {
      "domain_record": {
        "id": 123,
        "type": "A",
        "name": "www",
        "data": "162.10.66.0",
        "priority": null,
        "port": null,
        "weight": null
      }
    };

    it('returns the domain record', function() {
      testUtils.api.get('/v2/domains/example.com/domain_records/123').reply(200, JSON.stringify(data));

      client.domainRecords.get('example.com', 123, function(err, domainRecord, headers) {
        expect(domainRecord).to.be.eql(data.domain_record);
      });
    });
  });

  describe('update', function() {
    var data = {
      "domain_record": {
        "id": 123,
        "type": "A",
        "name": "blog",
        "data": "162.10.66.0",
        "priority": null,
        "port": null,
        "weight": null
      }
    };

    it('returns the domain record', function() {
      var attributes = {
        "name": "blog",
      };

      testUtils.api.put('/v2/domains/example.com/domain_records/123', attributes).reply(200, JSON.stringify(data));

      client.domainRecords.update('example.com', 123, attributes, function(err, domainRecord, headers) {
        expect(domainRecord).to.be.eql(data.domain_record);
      });
    });
  });

  describe('delete', function() {
    it('deletes the domain record', function(done) {
      testUtils.api.delete('/v2/domains/example.com/domain_records/123').reply(204, '');

      client.domainRecords.delete('example.com', 123, function() {
        done();
      });
    });
  });
});