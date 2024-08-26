import React from 'react';
import { Table } from 'flowbite-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AllTranslations = () => {
    const axiosSecure = useAxiosSecure();

    const { data: transactions = [], isLoading } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const res = await axiosSecure.post('/users/transactions');
            return res.data;
        },
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="p-4">
            {
                transactions.length === 0 && (
                    <div className="flex items-center justify-center py-12">
                        <span className="text-xl font-semibold">No Transactions Found.</span>
                    </div>
                )
            }
            <h2 className="text-2xl font-semibold mb-4">All Transactions</h2>
            <Table hoverable={true}>
                <Table.Head>
                    <Table.HeadCell>Date</Table.HeadCell>
                    <Table.HeadCell>Sender Number</Table.HeadCell>
                    <Table.HeadCell>Receiver Number</Table.HeadCell>
                    <Table.HeadCell>Total Amount</Table.HeadCell>
                    <Table.HeadCell>Type</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {transactions.map((transaction, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{new Date(transaction.date).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>{transaction.senderNumber ?? 'Not Found'}</Table.Cell>
                            <Table.Cell>{transaction.receiverNumber ?? 'Not Found'}</Table.Cell>
                            <Table.Cell>{transaction.totalAmount} BDT</Table.Cell>
                            <Table.Cell>{transaction.type}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default AllTranslations;
