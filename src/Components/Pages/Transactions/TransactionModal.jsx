import React, { useState, useEffect } from 'react';
import { Modal, Table } from 'flowbite-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useUser from '../../Hooks/useUser';

const TransactionModal = ({ show, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show) {
      const fetchTransactions = async () => {
        try {
          const response = await axiosSecure.post('/transactions', null, {
            headers: { email: user.email },
          });
          setTransactions(response.data);
        } catch (error) {
          setError(error);
          console.error('Failed to fetch transactions:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchTransactions();
    }
  }, [show, user.email, axiosSecure]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading transactions: {error.message}</div>;

  return (
    <Modal show={show} onClose={onClose} size="2xl" id='modal-bg'>
      <Modal.Header>Transactions</Modal.Header>
      <Modal.Body>
        <div className='h-96 overflow-auto'>
          <Table hoverable>
            <Table.Body className="divide-y">
              {transactions.length === 0 ? (
                <h1 className='text-center text-3xl font-bold'>No transactions found !</h1>
              ) : (
                transactions.map((transaction, index) => {
                  const date = new Date(transaction.date).toLocaleString();
                  
                  return (
                    <Table.Row key={index}>
                      <Table.Cell className='text-base font-medium'>
                        {transaction.type === 'debit' 
                          ? `You Sent ${transaction.amount} BDT To ${transaction.receiverNumber} On ${date}`
                          : transaction.type === 'credit'
                          ? `You Received ${transaction.amount} BDT From ${transaction.receiverNumber} On ${date}`
                          : transaction.type === 'withdraw'
                          ? `You Withdraw ${transaction.amount} BDT From ${transaction.toAgent} On ${date}`
                          : transaction.type === 'cashIn'
                          ? `You Cashed In ${transaction.amount} BDT From ${transaction.fromUser} On ${date}`
                          : 'Unknown transaction type'}
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionModal;
