var pg = require('pg');

module.exports = class SimpleStorage {
    constructor() {

    }
    readObject(callback) {
        var self = this;
        self._create((client, done) => {
            self._read(client, done, (data) => {
                if (data.length == 0)
                    callback({});
                else
                    callback(JSON.parse(data[data.length - 1].json));
            });
        });
    }
    writeObject(obj, callback) {
        var self = this;
        self._trunc((client, done) => {
            self._insert(client, done, obj, () => {
                callback();
            });
        });
    }

    _create(callback) {
        pg.connect(process.env.DATABASE_URL, function (err, client, done) {
            client.query('CREATE TABLE log(id SERIAL PRIMARY KEY, json text)', function (err, result) {
                callback(client, done);
            });
        });
    }
    _read(client, done, callback) {
        client.query('SELECT * FROM log', function (err, result) {
            done();
            callback(result.rows);
        });
    }
    _trunc(callback) {
        pg.connect(process.env.DATABASE_URL, function (err, client, done) {
            const query = client.query("TRUNCATE log", function (err, result) { callback(client, done); });
        });
    }
    _insert(client, done, data, callback) {
        client.query("INSERT INTO log(json) VALUES ('" + JSON.stringify(data) + "')", function (err, result) { done(); callback(); });
    }
}