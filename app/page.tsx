import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/constants";
export default function Home() {
  console.log("hi");
  return (
    <section>
      <h1 className="text-center"> The Hub For Every Dev <br /> You Can't Miss</h1>
      <p className="text-center mt-5"> Hackathons,Meetups and Conferences all in one place</p>
      <ExploreBtn />
      <div className="mt-20 space-y-7"> 
        <h3>Featured Events</h3>
        <ul className="events">{
            events.map((even)=>( // map function me curly braces ke jgh we give normal braces to automatically use this function. also ...even is basically sending all properties of events to the function as props
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
