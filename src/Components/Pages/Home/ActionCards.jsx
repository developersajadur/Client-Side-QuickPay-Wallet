// ActionCards.js
import { useState } from 'react';
import { FaArrowDown, FaArrowRight, FaCreditCard, FaExchangeAlt } from 'react-icons/fa';
import { IoMdGitPullRequest } from 'react-icons/io';
import useUser from '../../Hooks/useUser';
import WithdrawForm from '../Withdraw/WithdrawForm';
import SendMoneyForm from '../SendMoney/SendMoneyForm';
import PaymentModal from '../../Modals/PaymentModal';

const ActionCards = () => {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);

  const handleWithdraw = (data) => {
  };

  const handleSendMoney = (data) => {
    setShowModal(false);
  };

  const cards = user.role === 'agent'
    ? [
      { icon: <FaArrowDown className="text-purple-600" />, label: 'Withdraw', bgColor: 'bg-purple-50', action: 'withdraw' },
      { icon: <FaArrowRight className="text-orange-600" />, label: 'Send', bgColor: 'bg-orange-50', action: 'sendMoney' },
        { icon: <IoMdGitPullRequest className="text-purple-600" />, label: 'Request', bgColor: 'bg-purple-50' },
        { icon: <FaExchangeAlt className="text-red-600" />, label: 'Transactions', bgColor: 'bg-red-50' },
      ]
    : [
        { icon: <FaArrowDown className="text-purple-600" />, label: 'Withdraw', bgColor: 'bg-purple-50', action: 'withdraw' },
        { icon: <FaArrowRight className="text-orange-600" />, label: 'Send', bgColor: 'bg-orange-50', action: 'sendMoney' },
        { icon: <FaCreditCard className="text-blue-600" />, label: 'Cards', bgColor: 'bg-blue-50' },
        { icon: <FaExchangeAlt className="text-red-600" />, label: 'Transactions', bgColor: 'bg-red-50' }
      ];

  const handleCardClick = (action) => {
    switch (action) {
      case 'withdraw':
        setModalTitle('Withdraw Money');
        setModalContent(<WithdrawForm onSubmit={handleWithdraw} />);
        setShowModal(true);
        break;
      case 'sendMoney':
        setModalTitle('Send Money');
        setModalContent(<SendMoneyForm onSubmit={handleSendMoney} />);
        setShowModal(true);
        break;
      default:
        setShowModal(false);
    }
  };

  return (
    <div className="flex gap-5 lg:gap-20 justify-center mt-10">
      {cards.map((card, index) => (
        <button
          key={index}
          onClick={() => handleCardClick(card.action)}
          className={`w-32 h-32 p-4 flex flex-col items-center justify-center rounded-lg shadow-md ${card.bgColor}`}
        >
          <div className="text-2xl mb-2">{card.icon}</div>
          <div className="text-gray-700">{card.label}</div>
        </button>
      ))}

      <PaymentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={modalTitle}
      >
        {modalContent}
      </PaymentModal>
    </div>
  );
};

export default ActionCards;
