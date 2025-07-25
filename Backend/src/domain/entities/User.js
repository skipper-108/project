export class User {
  constructor(id, username, passwordHash, createdAt, updatedAt) {
    this.id = id;
    this.username = username;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(username, passwordHash) {
    return new User(null, username, passwordHash, new Date(), new Date());
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
} 