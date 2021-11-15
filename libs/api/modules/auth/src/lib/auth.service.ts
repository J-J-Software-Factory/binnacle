import { User } from '@generated/user/user.model';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SecurityConfig } from '@nx-admin-starter/api/config';
import { CryptService, PrismaService } from '@nx-admin-starter/api/recipes';
import { Utils } from '@nx-admin-starter/utils';
import { Prisma } from '@prisma/client';
import { AccessToken } from './dto/access-token.dto';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private cryptService: CryptService,
    private jwtService: JwtService
  ) {}

  async signUp(data: SignUpInput): Promise<AccessToken> {
    const email = Utils.normalize({ text: data.email, letterCase: 'lowercase' });
    const firstName = Utils.normalize({ text: data.firstName, letterCase: 'capitalize' });
    const lastName = Utils.normalize({ text: data.lastName || '', letterCase: 'capitalize' });

    const hashedPassword = await this.cryptService.hashPassword(data.password);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          profile: {
            create: {
              firstName,
              lastName,
            },
          },
        },
      });

      return this.generateTokens({ userId: newUser.id });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(`Email ${data.email} already exists`);
      } else {
        throw new Error(String(error));
      }
    }
  }

  async signIn({ email, password }: SignInInput): Promise<AccessToken> {
    const normalizedEmail = Utils.normalize({ text: email, letterCase: 'lowercase' });

    const user = await this.prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) {
      throw new NotFoundException(`Email address: ${email} was not found`);
    }

    const isPasswordValid = await this.cryptService.validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({ userId: user.id });
  }

  validateUser(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  decodeToken(accessToken: string): Promise<User | null> {
    const keys = this.jwtService.decode(accessToken);

    let userId = '';

    if (keys && typeof keys === 'object') {
      userId = keys.userId;
    }

    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  private generateTokens(payload: { userId: User['id'] }): AccessToken {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: User['id'] }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: User['id'] }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    const secret = this.configService.get('JWT_REFRESH_SECRET');
    const expiresIn = securityConfig?.refreshIn;

    return this.jwtService.sign(payload, { secret, expiresIn });
  }

  refreshToken(token: string) {
    try {
      const secret = this.configService.get('JWT_REFRESH_SECRET');
      const { userId } = this.jwtService.verify(token, { secret });
      this.generateTokens(userId);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
