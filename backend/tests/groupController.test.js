const groupController = require("../controllers/groupController");
const Group = require("../models/groupModel");
const User = require("../models/userModel");

// Mocking of models
jest.mock("../models/groupModel");
jest.mock("../models/userModel");

describe("Group Controller Tests", () => {
  describe("createGroup", () => {
    it("should create a new group", async () => {
      User.findById = jest.fn().mockResolvedValue({ _id: "user1" });
      Group.findOne = jest.fn().mockResolvedValue(null);
      Group.create = jest
        .fn()
        .mockResolvedValue({
          _id: "group1",
          name: "Test Group",
          users: ["user1"],
        });

      const req = {
        body: { name: "Test Group" },
        params: { user_id: "user1" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await groupController.createGroup(req, res);

      expect(Group.findOne).toHaveBeenCalledWith({ name: "Test Group" });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Group created id : group1",
      });
    });

    it("should not create a group if the name already exists", async () => {
      Group.findOne = jest
        .fn()
        .mockResolvedValue({
          _id: "group1",
          name: "Test Group",
          users: ["user1"],
        });

      const req = {
        body: { name: "Test Group" },
        params: { user_id: "user1" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await groupController.createGroup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Group name must be unique",
      });
    });
  });

  describe("getInfoGroup", () => {
    it("should return group information", async () => {
      Group.findById = jest
        .fn()
        .mockResolvedValue({
          _id: "group1",
          name: "Test Group",
          users: ["user1"],
        });

      const req = {
        params: { user_id: "user1", group_id: "group1" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await groupController.getInfoGroup(req, res);

      expect(Group.findById).toHaveBeenCalledWith("group1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.anything());
    });
  });

  describe("deleteGroup", () => {
    it("should delete a group", async () => {
      User.findById = jest.fn().mockResolvedValue({ _id: "user1" });
      Group.findById = jest
        .fn()
        .mockResolvedValue({
          _id: "group1",
          name: "Test Group",
          users: ["user1"],
          user_id: "user1",
        });
      Group.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: "group1" });

      const req = {
        params: { user_id: "user1", group_id: "group1" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await groupController.deleteGroup(req, res);

      expect(Group.findByIdAndDelete).toHaveBeenCalledWith("group1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Group deleted" });
    });

    it("should return an error if the group is not found", async () => {
      Group.findById = jest.fn().mockResolvedValue(null);

      const req = {
        params: { user_id: "user1", group_id: "nonexistentgroup" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await groupController.deleteGroup(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Group not found" });
    });
  });

  describe("putGroup", () => {
    it("should update a group", async () => {
      User.findById = jest.fn().mockResolvedValue({ _id: "user1" });
      Group.findById = jest
        .fn()
        .mockResolvedValue({
          _id: "group1",
          name: "Test Group",
          users: ["user1"],
          user_id: "user1",
        });
      Group.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue({
          _id: "group1",
          name: "Updated Test Group",
          users: ["user1"],
        });

      const req = {
        params: { user_id: "user1", group_id: "group1" },
        body: { name: "Updated Test Group" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await groupController.putGroup(req, res);

      expect(Group.findByIdAndUpdate).toHaveBeenCalledWith(
        "group1",
        { name: "Updated Test Group" },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.anything());
    });
  });
});
