import { NextResponse } from "next/server";
import { mockProjects, workTypes } from "@/data/mock";

export async function GET() {
  return NextResponse.json({
    projects: mockProjects,
    workTypes: workTypes,
  });
}
