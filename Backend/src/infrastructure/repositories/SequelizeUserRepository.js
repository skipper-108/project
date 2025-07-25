import User from '../database/models/User.js';
import { User as UserEntity } from '../../domain/entities/User.js';

export class SequelizeUserRepository {
  async findByUsername(username) {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) return null;

      return new UserEntity(
        user.id,
        user.username,
        user.passwordHash,
        user.createdAt,
        user.updatedAt
      );
    } catch (error) {
      throw new Error(`Error finding user by username: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) return null;

      return new UserEntity(
        user.id,
        user.username,
        user.passwordHash,
        user.createdAt,
        user.updatedAt
      );
    } catch (error) {
      throw new Error(`Error finding user by ID: ${error.message}`);
    }
  }

  async create(userEntity) {
    try {
      const user = await User.create({
        username: userEntity.username,
        passwordHash: userEntity.passwordHash,
      });

      return new UserEntity(
        user.id,
        user.username,
        user.passwordHash,
        user.createdAt,
        user.updatedAt
      );
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async update(userEntity) {
    try {
      const user = await User.findByPk(userEntity.id);
      if (!user) {
        throw new Error('User not found');
      }

      await user.update({
        username: userEntity.username,
        passwordHash: userEntity.passwordHash,
      });

      return new UserEntity(
        user.id,
        user.username,
        user.passwordHash,
        user.createdAt,
        user.updatedAt
      );
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }

      await user.destroy();
      return true;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
} 