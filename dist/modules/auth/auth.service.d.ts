import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { INewUser } from 'src/config/interface';
import { ShareService } from '../share/share.service';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private jwtService;
    private configService;
    private shareService;
    private userRepository;
    constructor(jwtService: JwtService, configService: ConfigService, shareService: ShareService, userRepository: Repository<User>);
    client: OAuth2Client;
    clientUrl: any;
    register(newUserDto: INewUser): Promise<{
        msg: string;
    }>;
    login(account: string, password: string, res: Response): Promise<{
        msg: string;
        access_token: string;
        user: any;
    }>;
    loginUser(user: any, password: string, res: Response): Promise<{
        msg: string;
        access_token: string;
        user: any;
    }>;
    logout(res: Response): Promise<{
        msg: string;
    }>;
    refreshToken(req: Request): Promise<{
        access_token: string;
        user: User;
    }>;
}
