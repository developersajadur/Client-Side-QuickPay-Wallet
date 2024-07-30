import { FaPlus } from "react-icons/fa";

const BalanceCard = () => {
    return (
      <div className="flex flex-col justify-center items-center mt-5">
          <div className="bg-white shadow-md w-1/2 h-60 rounded-lg p-6 flex items-start justify-between">
      <div>
        <div className="text-gray-600">Your Wallet</div>
        <div className="text-2xl font-bold">$1,450.50</div>
      </div>
      <div className="flex items-center">
        <div className="bg-gray-100 p-3 rounded-full cursor-pointer">
          <FaPlus className="text-blue-600" />
        </div>
        <div className="ml-2 text-blue-600 cursor-pointer">Add Balance</div>
      </div>
    </div>
      </div>
    );
};

export default BalanceCard;