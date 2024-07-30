import ActionCards from "./ActionCards";
import BalanceCard from "./BalanceCard";

const HomePage = () => {

    return (
         <div className="px-2 md:px-5 lg:px-10">
            <BalanceCard/>
            <ActionCards/>
         </div>
    );
};

export default HomePage;