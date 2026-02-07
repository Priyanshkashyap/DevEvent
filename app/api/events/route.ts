import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/database";

export async function GET() {
  try {
    await connectToDatabase();
    const events = await Event.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ events }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Failed to fetch events", error: e instanceof Error ? e.message : 'unknown' },
      { status: 500 }
    );
  }
}

export async function POST(req:NextRequest)
{
    try{
        await connectToDatabase();
        const formdata=await req.formData();
        let event;
        try{
            event=Object.fromEntries(formdata.entries());
        }catch(e)
        {
            return NextResponse.json({message:"invalid json data format",error:e instanceof Error?e.message:'unknown'},{status:400})
        }
        const createdEvent=await Event.create(event);
        return NextResponse.json({message:'Event created successfully',event:createdEvent},{status:201})
    }
    catch(e)
    {
        console.error(e);
        return NextResponse.json({message:"event creation failed",error:e instanceof Error?e.message:'unknown'},{status:400})
    }
}