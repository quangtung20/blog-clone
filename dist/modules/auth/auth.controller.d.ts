import { Request, Response } from 'express';
import { INewUser } from 'src/config/interface';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(newUserDto: INewUser): Promise<{
        msg: string;
    }>;
    login(account: string, password: string, res: Response): Promise<{
        msg: string;
        access_token: string;
        user: any;
    }>;
    logout(res: Response): Promise<{
        msg: string;
    }>;
    refreshToken(req: Request): Promise<{
        access_token: string;
        user: import("../../database/entities/user.entity").User;
    }>;
}
