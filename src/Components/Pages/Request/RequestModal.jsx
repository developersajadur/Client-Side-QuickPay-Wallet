import { Button, Dropdown, Modal, Table } from 'flowbite-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useUser from '../../Hooks/useUser';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const RequestModal = ({ show, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useUser();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosSecure.post('/request', null, {
          headers: { email: user.email },
        });
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    if (user) {
      fetchRequests();
    }
  }, [user, axiosSecure]);

  const handleRequestAction = async (requestNumber, requestAmount, action) => {
    try {
      const response = await axiosSecure.post('/handleRequest', { requestNumber, requestAmount, action }, {
        headers: { email: user?.email },
      });

      if (response.status === 200) {
        toast.success(action === 'approve' ? 'Request approved successfully' : 'Request denied successfully');
        // Refresh the request list after handling
        setRequests(prevRequests => prevRequests.filter(req => req.fromUser !== requestNumber));
      } else {
        toast.error('Failed to process the request');
      }
    } catch (error) {
      console.error('Error handling request:', error);
      toast.error('An error occurred while processing the request');
    }
  };

  return (
    <Modal show={show} onClose={onClose} size="2xl" id="modal-bg">
      <Modal.Header>Request</Modal.Header>
      <Modal.Body>
        <div className="h-96 overflow-auto">
          <Table hoverable>
            <Table.Body className="divide-y">
              {requests.map((request, index) => {
                const date = new Date(request.date).toLocaleString(); // Corrected here
                return (
                  <Table.Row key={index}>
                    <Table.Cell className="flex justify-between items-center">
                      <p className="text-base font-medium">
                        {`You Have A ${request.amount} BDT Cash In Request From ${request.fromUser} On ${date}`}
                      </p>
                      <div className="bg-blue-500 w-fit">
                        <Dropdown
                          label="Options"
                          dismissOnClick={false}
                          className="w-fit rounded-md shadow-md"
                        >
                          <Dropdown.Item onClick={() => handleRequestAction(request.fromUser, request.amount, 'approve')}>Approve</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleRequestAction(request.fromUser, request.amount, 'deny')}>Deny</Dropdown.Item>
                        </Dropdown>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RequestModal;
