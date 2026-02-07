import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function getEvents() {
  "use cache";
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();
  return events;
}

export default async function Home() {
  console.log("hi");
  const events = await getEvents();
  return (
    <section>
      <h1 className="text-center"> The Hub For Every Dev <br /> You Can&apos;t Miss</h1>
      <p className="text-center mt-5"> Hackathons,Meetups and Conferences all in one place</p>
      <ExploreBtn />
      <div className="mt-20 space-y-7"> 
        <h3>Featured Events</h3>
        <ul className="events">{
            events && events.length>0 && events.map((even:IEvent)=>( // map function me curly braces ke jgh we give normal braces to automatically use this function. also ...even is basically sending all properties of events to the function as props
              <li key={even.title}>
                <EventCard {...even} />  
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  );
}
