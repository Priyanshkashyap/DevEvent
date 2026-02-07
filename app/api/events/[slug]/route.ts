import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/database";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    // Await params to get the slug value
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Query event by slug
    const event = await Event.findOne({ slug: slug.trim() }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    // Return event data
    return NextResponse.json(
      { event },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching event by slug:", error);

    // Handle database connection errors
    if (error instanceof Error && error.message.includes("connection")) {
      return NextResponse.json(
        { message: "Database connection failed", error: error.message },
        { status: 503 }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
