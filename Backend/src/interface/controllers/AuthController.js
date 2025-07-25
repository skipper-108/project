import { RegisterUserUseCase } from '../../application/usecases/auth/RegisterUserUseCase.js';
import { LoginUserUseCase } from '../../application/usecases/auth/LoginUserUseCase.js';
import { SequelizeUserRepository } from '../../infrastructure/repositories/SequelizeUserRepository.js';

const userRepository = new SequelizeUserRepository();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);

export class AuthController {
  async register(req, res, next) {
    try {
      const { username, password } = req.body;

      const user = await registerUserUseCase.execute(username, password);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: user,
      });
    } catch (error) {
      if (error.message === 'Username already exists') {
        return res.status(409).json({
          success: false,
          message: error.message,
        });
      }

      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const result = await loginUserUseCase.execute(username, password);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({
          success: false,
          message: error.message,
        });
      }

      next(error);
    }
  }
} 