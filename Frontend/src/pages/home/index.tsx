import Footer from "../../components/footer";
import HomeCard from "../../components/homeCard";
import NavbarTop from "../../components/navbarTop";
import ProfileCard from "../../components/profileCard";
import SideCard from "../../components/sideCard";

function Home() {
    return (
        <div>
            <NavbarTop />
            <div className="flex m-10 space-x-5 space-y-5">
                <HomeCard />
                <div className="flex flex-col w-1/3">
                    <ProfileCard />
                    <SideCard />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
