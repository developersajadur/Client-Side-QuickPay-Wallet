import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import useUser from "../../Hooks/useUser";
import PaymentModal from '../../Modals/PaymentModal';
import AddMoneyForm from "../AddMoney/AddMoneyForm";

const BalanceCard = () => {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);

  const handleAddBalanceClick = () => {
    setShowModal(true);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <div className="bg-white shadow-md w-full md:w-1/2 lg:w-1/2 h-40 md:h-60 rounded-lg p-6 flex flex-col md:flex-row items-start justify-between">
        <div>
          <div className="text-gray-600">Your Wallet</div>
          <div className="text-2xl font-bold">{user?.balance || 0} BDT</div>
        </div>
        {user.role === 'agent' ? null : (
          <div className="flex items-center" onClick={handleAddBalanceClick}>
            <div className="bg-gray-100 p-3 rounded-full cursor-pointer">
              <FaPlus className="text-blue-600" />
            </div>
            <div className="ml-2 text-blue-600 cursor-pointer">Add Balance</div>
          </div>
        )}
      </div>

      <PaymentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Add Balance"
      >
        <AddMoneyForm onClose={() => setShowModal(false)} /> {/* Pass onClose to the form */}
      </PaymentModal>
    </div>
  );
};

export default BalanceCard;
