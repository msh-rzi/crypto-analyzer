import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from 'shared/prisma/prisma.service';
import {
  DUPLICATE_ERROR,
  NOT_FOUND,
  SOMETHING_HAPPEN_ERROR,
} from 'shared/constants/errors';

@Injectable()
export class UserBaseService {
  logger = new Logger();
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(raw: CreateUserDto) {
    try {
      const isDuplicate = await this.prismaService.user.findFirst({
        where: {
          OR: [{ username: raw.username }, { email: raw.email }],
        },
      });

      if (isDuplicate) {
        this.logger.error(
          'Failed to create user with error : ' + DUPLICATE_ERROR,
        );
        return {
          isSuccess: false,
          data: null,
          statue_code: 409,
          error_cause: DUPLICATE_ERROR,
        };
      }

      const newUser = await this.prismaService.user.create({
        data: {
          ...raw,
          isActive: true,
        },
        select: {
          username: true,
          email: true,
        },
      });

      this.logger.log('Create user successfully');

      return {
        isSuccess: true,
        data: newUser,
        statue_code: 200,
        error_cause: null,
      };
    } catch (error) {
      this.logger.error('Failed to create user with error : ' + error);
      return {
        isSuccess: false,
        data: null,
        statue_code: 500,
        error_cause: SOMETHING_HAPPEN_ERROR,
      };
    }
  }

  async getAll() {
    try {
      const users = await this.prismaService.user.findMany({
        where: {
          isActive: true,
        },
        select: {
          id: true,
          email: true,
          username: true,
          isActive: true,
          telegram: true,
          alerts: true,
          robots: true,
          subscriptions: true,
        },
      });

      return {
        isSuccess: true,
        data: users,
        statue_code: 200,
        error_cause: null,
      };
    } catch (error) {
      this.logger.error('Failed to get all users with error : ' + error);
      return {
        isSuccess: false,
        data: null,
        statue_code: 500,
        error_cause: SOMETHING_HAPPEN_ERROR,
      };
    }
  }

  async findByEmailAndUsername({
    email,
    username,
  }: Pick<CreateUserDto, 'email' | 'username'>) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      if (!user) {
        this.logger.warn('User not found : ' + email + ' - ' + username);
        return {
          isSuccess: false,
          data: null,
          statue_code: 404,
          error_cause: NOT_FOUND,
        };
      }

      return {
        isSuccess: true,
        data: user,
        statue_code: 200,
        error_cause: null,
      };
    } catch (error) {
      this.logger.error('Failed to find user with error : ' + error);
      return {
        isSuccess: false,
        data: null,
        statue_code: 500,
        error_cause: SOMETHING_HAPPEN_ERROR,
      };
    }
  }

  async findById({ id }: { id: number }) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { id },
      });

      if (!user) {
        this.logger.warn('User not found : ' + id);
        return {
          isSuccess: false,
          data: null,
          statue_code: 404,
          error_cause: NOT_FOUND,
        };
      }

      this.logger.log('User created successfully');

      return {
        isSuccess: true,
        data: user,
        statue_code: 200,
        error_cause: null,
      };
    } catch (error) {
      this.logger.error('Failed to find user with error : ' + error);
      return {
        isSuccess: false,
        data: null,
        statue_code: 500,
        error_cause: SOMETHING_HAPPEN_ERROR,
      };
    }
  }
}
