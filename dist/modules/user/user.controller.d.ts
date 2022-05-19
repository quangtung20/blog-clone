import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(id: string): Promise<import("../../database/entities/user.entity").User>;
    resetPassword(user: any, password: string): Promise<{
        msg: string;
    }>;
    updateUser(user: any, data: any): Promise<{
        msg: string;
    }>;
}
