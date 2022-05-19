import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getUser(id: any): Promise<User>;
    resetPassword(user: any, password: string): Promise<{
        msg: string;
    }>;
    updateUser(user: any, data: any): Promise<{
        msg: string;
    }>;
}
