import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProgressBar from "@/components/timesheets/ProgressBar";

describe("ProgressBar", () => {
  it("displays hours correctly", () => {
    render(<ProgressBar current={20} target={40} />);
    expect(screen.getByText("20/40 hrs")).toBeDefined();
  });

  it("calculates percentage correctly", () => {
    render(<ProgressBar current={20} target={40} />);
    expect(screen.getByText("50%")).toBeDefined();
  });

  it("shows 100% when target is reached", () => {
    render(<ProgressBar current={40} target={40} />);
    expect(screen.getByText("100%")).toBeDefined();
  });

  it("caps percentage at 100% when over target", () => {
    render(<ProgressBar current={50} target={40} />);
    expect(screen.getByText("100%")).toBeDefined();
  });

  it("shows 0% when no hours logged", () => {
    render(<ProgressBar current={0} target={40} />);
    expect(screen.getByText("0%")).toBeDefined();
  });
});
