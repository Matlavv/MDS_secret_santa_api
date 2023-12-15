const userController = require('../controllers/userController');
const User = require('../models/userModel');

// Mocking the User model
jest.mock('../models/userModel');

// Test for userRegister
describe('userRegister', () => {
    it('should create a new user and return success message', async () => {
        // Mock the User.create method
        User.create = jest.fn().mockResolvedValue({ 
            _id: '1', 
            email: 'test@example.com', 
            password: 'password123' 
        });

        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await userController.userRegister(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'User created' });
    });

});

// User Login
describe('userLogin', () => {
    it('should authenticate a user and return a token', async () => {
        // Mock User.findOne to simulate a successful find
        User.findOne = jest.fn().mockResolvedValue({
            _id: '1',
            email: 'test@example.com',
            password: 'hashedpassword',
            comparePassword: jest.fn().mockResolvedValue(true)
        });

        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await userController.userLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled(); // Check if a token is returned
    });
    it('should return an error message if the user is not found', async () => {
        // No user found
        User.findOne = jest.fn().mockResolvedValue(null);

        const req = {
            body: {
                email: 'nonexistent@example.com',
                password: 'password123'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await userController.userLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return an error message if the password is incorrect', async () => {
        // User found but with a wrong password
        User.findOne = jest.fn().mockResolvedValue({
            email: 'test@example.com',
            password: 'wronghashedpassword'
        });

        const req = {
            body: {
                email: 'test@example.com',
                password: 'incorrectpassword'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await userController.userLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Wrong login identifiants' });
    });
});

// Delete user
describe('deleteUser', () => {
    it('should delete a user and return a success message', async () => {
        // Mock User.findByIdAndDelete
        User.findByIdAndDelete = jest.fn().mockResolvedValue(true);

        const req = {
            params: {
                user_id: '1'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await userController.deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'User deleted' });
    });

    // Add more tests to handle the case where the user is not found, etc.
});
describe('createGroup', () => {
    it('should create a group and return a success message', async () => {
        // Mock Group.create
        Group.create = jest.fn().mockResolvedValue({
            _id: '1',
            name: 'Test Group',
            users: ['1']
        });

        const req = {
            body: {
                name: 'Test Group'
            },
            params: {
                user_id: '1'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await groupController.createGroup(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: `Group created id : 1` });
    });

    // Add more tests for failure cases, like if the group name already exists, etc.
});
describe('addInvitation', () => {
    it('should create an invitation and return a success message', async () => {
        // Mocking necessary models and methods
        User.findById = jest.fn().mockResolvedValue({ _id: '1', email: 'user@example.com' });
        Group.findById = jest.fn().mockResolvedValue({ _id: '1', name: 'Test Group', users: ['1'] });

        const req = {
            params: {
                user_id: '1',
                group_id: '1'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await invitationController.addInvitation(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invitation send' });
    });
});


