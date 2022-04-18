const db = require('../Database/database');

module.exports = class Member {
  constructor(Id, Name) {
    this.Id = Id;
    this.Name = Name;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM member');
  }

  static post(Id, Name) {
    return db.execute('INSERT INTO member (Id, Name) VALUES (?, ?)', [Id, Name]);
  }

  static update(Id, Name) {
    return db.execute('UPDATE member SET Name = ? WHERE Id = ?', [Name, Id]);
  }

  static delete(Id) {
    return db.execute('DELETE FROM member WHERE Id = ?', [Id]);
  }
};
