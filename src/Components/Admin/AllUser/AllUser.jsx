import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'flowbite-react';
import Loader from '../../Loader/Loader';

const AllUser = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.post('/users');
            return res.data;
        }
    });

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>
            <Table hoverable={true}>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {users.length > 0 ? (
                        users.map(user => (
                            <Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{user.name}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.role || 'User'}</Table.Cell>
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Row>
                            <Table.Cell colSpan="3" className="text-center">
                                No users found.
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    );
};

export default AllUser;
