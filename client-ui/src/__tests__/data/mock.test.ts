import { describe, it, expect } from "vitest";
import { calculateStatus, mockUsers, mockProjects, mockCredentials } from "@/data/mock";

describe("Mock Data", () => {
  describe("calculateStatus", () => {
    it("returns 'completed' when hours are 40 or more", () => {
      expect(calculateStatus(40)).toBe("completed");
      expect(calculateStatus(45)).toBe("completed");
    });

    it("returns 'incomplete' when hours are between 1 and 39", () => {
      expect(calculateStatus(20)).toBe("incomplete");
      expect(calculateStatus(39)).toBe("incomplete");
      expect(calculateStatus(1)).toBe("incomplete");
    });

    it("returns 'missing' when hours are 0", () => {
      expect(calculateStatus(0)).toBe("missing");
    });
  });

  describe("mockUsers", () => {
    it("contains at least one user", () => {
      expect(mockUsers.length).toBeGreaterThan(0);
    });

    it("has valid user structure", () => {
      const user = mockUsers[0];
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("email");
    });
  });

  describe("mockProjects", () => {
    it("contains multiple projects", () => {
      expect(mockProjects.length).toBeGreaterThan(0);
    });

    it("has valid project structure", () => {
      const project = mockProjects[0];
      expect(project).toHaveProperty("id");
      expect(project).toHaveProperty("name");
    });
  });

  describe("mockCredentials", () => {
    it("has email and password", () => {
      expect(mockCredentials).toHaveProperty("email");
      expect(mockCredentials).toHaveProperty("password");
    });

    it("matches the mock user email", () => {
      const user = mockUsers.find((u) => u.email === mockCredentials.email);
      expect(user).toBeDefined();
    });
  });
});
