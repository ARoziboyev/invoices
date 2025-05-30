import Header from "../components/Header";
import InvoicesCards from "../components/InvoicesCards";
import SideBar from "../components/SideBar";

function Home() {
  return (
    <div className="bg-[#F8F8FB] dark:bg-[#141625] min-h-screen pt-[72px] lg:pt-0">
      <SideBar />
      <div className="lg:ml-[103px] px-4 sm:px-6 md:px-10 pb-20 lg:pb-0">
        <Header />
        <InvoicesCards />
      </div>
    </div>
  );
}

export default Home;
