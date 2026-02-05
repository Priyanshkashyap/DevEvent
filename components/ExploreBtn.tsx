"use client" //need to make this client side as we are using on click function.thats why we made it in components folder to separate from main page.tsx which needs to be server side for max seo benefits
import posthog from "posthog-js";

const ExploreBtn=()=>{
    const handleClick = () => {
        posthog.capture('explore_events_clicked');
    };

    return(
        <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={handleClick}>
           <a href="#events">
            Explore Events
            <img src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24}>
            </img>
           </a>
        </button>
    )
}
export default ExploreBtn;