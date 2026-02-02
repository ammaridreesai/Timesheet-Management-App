import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/components/ui/Pagination";

describe("Pagination", () => {
  it("renders page numbers correctly", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("5")).toBeDefined();
  });

  it("disables Previous button on first page", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    const prevButton = screen.getByText("Previous");
    expect(prevButton.hasAttribute("disabled")).toBe(true);
  });

  it("disables Next button on last page", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />
    );

    const nextButton = screen.getByText("Next");
    expect(nextButton.hasAttribute("disabled")).toBe(true);
  });

  it("calls onPageChange when clicking a page number", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByText("3"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange when clicking Next", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByText("Next"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange when clicking Previous", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByText("Previous"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("highlights current page", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    const currentPageButton = screen.getByText("3");
    expect(currentPageButton.className).toContain("bg-[#3B5BDB]");
    expect(currentPageButton.className).toContain("text-white");
  });
});
