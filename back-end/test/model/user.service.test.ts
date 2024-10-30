import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import userDb from '../../repository/user.db';
import { UserInput } from '../../types';

const userInput: UserInput = {
    email: 'john.doe@ucll.be',
    firstName: 'John',
    lastName: 'Doe',
    password: 'johnd123',
};

const user = new User({
    ...userInput,
});

