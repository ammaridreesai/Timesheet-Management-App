import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusBadge from "@/components/ui/StatusBadge";

describe("StatusBadge", () => {
  it("renders completed status correctly", () => {
    render(<StatusBadge status="completed" />);
    const badge = screen.getByText("COMPLETED");
    expect(badge).toBeDefined();
    expect(badge.className).toContain("bg-green-100");
    expect(badge.className).toContain("text-green-700");
  });

  it("renders incomplete status correctly", () => {
    render(<StatusBadge status="incomplete" />);
    const badge = screen.getByText("INCOMPLETE");
    expect(badge).toBeDefined();
    expect(badge.className).toContain("bg-yellow-100");
    expect(badge.className).toContain("text-yellow-700");
  });

  it("renders missing status correctly", () => {
    render(<StatusBadge status="missing" />);
    const badge = screen.getByText("MISSING");
    expect(badge).toBeDefined();
    expect(badge.className).toContain("bg-red-100");
    expect(badge.className).toContain("text-red-600");
  });
});
