const userController = require("../controllers/userController");
const User = require("../models/userModel");

// Mocking the User model
jest.mock("../models/userModel");

describe("User Controller Tests", () => {
  describe("userRegister", () => {
    it("should create a new user and return success message", async () => {
      User.create = jest.fn().mockResolvedValue({
        _id: "1",
        email: "test@example.com",
        password: "password123",
      });

      const req = {
        body: { email: "test@example.com", password: "password123" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userController.userRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "User created" });
    });
  });

  describe("userLogin", () => {
    it("should authenticate a user and return a token", async () => {
      User.findOne = jest.fn().mockResolvedValue({
        _id: "1",
        email: "test@example.com",
        password: "hashedpassword",
        comparePassword: jest.fn().mockResolvedValue(true),
      });

      const req = {
        body: { email: "test@example.com", password: "password123" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userController.userLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });

    it("should return an error message if the user is not found", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);

      const req = {
        body: { email: "nonexistent@example.com", password: "password123" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userController.userLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return an error message if the password is incorrect", async () => {
      User.findOne = jest.fn().mockResolvedValue({
        email: "test@example.com",
        password: "wronghashedpassword",
      });

      const req = {
        body: { email: "test@example.com", password: "incorrectpassword" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userController.userLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Wrong login identifiants",
      });
    });
  });

  describe("deleteUser", () => {
    it("should delete a user and return a success message", async () => {
      User.findByIdAndDelete = jest.fn().mockResolvedValue(true);

      const req = {
        params: { user_id: "1" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "User deleted" });
    });
  });
});
