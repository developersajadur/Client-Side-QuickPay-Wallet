import React, { useState } from 'react';
import { Table, Button, Dropdown } from 'flowbite-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AllUser = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.post('/users');
            return res.data;
        },
    });

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axiosSecure.patch(`/users/${id}/status`, { status: newStatus });
            refetch(); // Refetch users after updating the status
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="p-4">
            {
                users.length === 0 && (
                    <div className="flex items-center justify-center py-12">
                        <span className="text-xl font-semibold">No Users Found.</span>
                    </div>
                )
            }
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>
            <Table hoverable={true}>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Number</Table.HeadCell>
                    <Table.HeadCell>Balance</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {users.map(user => (
                        <Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell>{user.mobileNumber}</Table.Cell>
                            <Table.Cell>{user.balance} BDT</Table.Cell>
                            <Table.Cell>{user.role}</Table.Cell>
                            <Table.Cell className=''>
                                <button className='bg-blue-500 rounded-lg w-28'>
                                <Dropdown label={user.status} className=''>
                                    <Dropdown.Item onClick={() => handleStatusChange(user._id, 'pending')} color="warning" className=''>
                                        Pending
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleStatusChange(user._id, 'active')} color="success">
                                        Active
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleStatusChange(user._id, 'blocked')} color="danger">
                                        Block
                                    </Dropdown.Item>
                                </Dropdown>
                                </button>
                          
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default AllUser;
