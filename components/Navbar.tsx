import Link from "next/link"
import Image from "next/image"
const Navbar=()=>{
    return(
        <header>
            <nav>
                <Link href='/' className="logo">
                <Image src="/icons/logo.png" alt="logo" width={24} height={24} >
                </Image>
                <p> DevEvent</p>
                </Link>
                <ul> 
                    <Link href="/">Home </Link>         
                    <Link href="/">Home </Link> 
                    <Link href="/">Home </Link> 
                    <Link href="/">Home </Link> 
                </ul>
            </nav>
        </header>
    )
}
export default Navbar;

// in the navbar ,one link is at the far left while the others is at the rightmost because of flex used at globals.css