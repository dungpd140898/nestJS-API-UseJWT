import { Injectable } from '@nestjs/common';

export type User = {
    id: number;
    name: string;
    username: string;
    password: string;
}
@Injectable()
export class UsersService {
    private readonly users = [
        {
          id: 1,
          name: 'John',
          username: 'john',
          password: 'changeme',
        },
        {
          id: 2,
          name: 'Mary',
          username: 'dungpd14898',
          password: 'Dungpd14898',
        },
      ];
    
      async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
      }
}
