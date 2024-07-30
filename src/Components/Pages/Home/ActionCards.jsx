import React from 'react';
import { FaArrowDown, FaArrowRight, FaCreditCard, FaExchangeAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ActionCards = () => {
  const cards = [
    { icon: <FaArrowDown className="text-purple-600" />, label: 'Withdraw', bgColor: 'bg-purple-50', path: '/withdraw' },
    { icon: <FaArrowRight className="text-orange-600" />, label: 'Send', bgColor: 'bg-orange-50', path: '/sent-money'},
    { icon: <FaCreditCard className="text-blue-600" />, label: 'Cards', bgColor: 'bg-blue-50', path: '/card' },
    { icon: <FaExchangeAlt className="text-red-600" />, label: 'Transactions', bgColor: 'bg-red-50', path: '/transactions' },
  ];

  return (
    <div className="flex gap-5 lg:gap-20 justify-center mt-10">
      {cards.map((card, index) => (
        <Link to={card.path} key={index} className={`w-32 h-32 p-4 flex flex-col items-center justify-center rounded-lg shadow-md ${card.bgColor}`}>
          <div className="text-2xl mb-2">{card.icon}</div>
          <div className="text-gray-700">{card.label}</div>
        </Link>
      ))}
    </div>
  );
}

export default ActionCards;
