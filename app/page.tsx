import ExploreBtn from "@/components/ExploreBtn";
import Navbar from "@/components/Navbar";
export default function Home() {
  console.log("hi");
  return (
    <section>
      <Navbar></Navbar>
      <h1 className="text-center"> The Hub For Every Dev <br /> You Can't Miss</h1>
      <p className="text-center mt-5"> Hackathons,Meetups and Conferences all in one place</p>
      <ExploreBtn />
      <div className="mt-20 space-y-7"> 
        <h3>Featured Events</h3>
        <ul className="events">{
            [1,2,3,4,5].map((even)=>( // map function me curly braces ke jgh we give normal braces to automatically use this function
              <li key={even}> Event {even} </li>
            ))
          }
        </ul>
      </div>
    </section>
  );
}
