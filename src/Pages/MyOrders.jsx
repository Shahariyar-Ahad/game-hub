import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { AuthContext } from '../provider/AuthProvider'; 
import { Link } from 'react-router-dom';


import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const MyOrders = () => {
    // 1. Hooks and Context
    const { user, loading: authLoading } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

   
    const fetchMyOrders = async () => {
        if (!user || !user.email) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            
            const response = await axios.get(`http://localhost:3100/my-orders?email=${user.email}`);
            setOrders(response.data);
            toast.info(`Loaded ${response.data.length} orders.`, { autoClose: 1500 });
        } catch (error) {
            console.error("Error fetching user orders:", error);
            toast.error("Failed to load your orders.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading) {
            fetchMyOrders();
        }
    }, [user, authLoading]); 

    // 3. PDF Download Functionality (Download Report)
    const handleDownloadReport = () => {
        if (orders.length === 0) {
            toast.warn("No orders to export.");
            return;
        }

        // 3.1. Create new jsPDF instance
        const doc = new jsPDF({ orientation: "landscape" }); 

        // 3.2. Define Table Headers
        const headers = [
            'Listing Name', 
            'Buyer Name', 
            'Price (Total)', 
            'Quantity', 
            'Phone',
            'Address',
            'Date', 
        ];

        // 3.3. Prepare Table Body Data
        const data = orders.map(order => [
            order.listingName || 'N/A',
            order.buyerName || 'N/A',
            // eslint-disable-next-line no-constant-binary-expression
            `৳${(order.listingPrice * order.quantity).toLocaleString()}` || '৳0', // Total Price
            order.quantity || 1,
            order.buyerPhone || 'N/A',
            order.buyerAddress || 'N/A',
            new Date(order.createdAt).toLocaleDateString() || 'N/A', 
        ]);

        // 3.4. Generate the Table using autoTable
        doc.autoTable({
            head: [headers],
            body: data,
            startY: 20,
            styles: { fontSize: 8 },
            headStyles: { fillColor: '#FF6347' }, // PetPaw Theme Color
            didDrawPage: (data) => {
                doc.text(`My Orders Report - ${user?.email}`, data.settings.margin.left, 10);
            },
        });

        // 3.5. Save the PDF
        doc.save(`PetPaw_MyOrders_${user?.displayName || 'Report'}_${new Date().toISOString().slice(0, 10)}.pdf`);
        toast.success("PDF report downloaded successfully!");
    };


    // 4. Loading State
    if (loading || authLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Bars height="80" width="80" color="#79FFCC" ariaLabel="loading-indicator" />
            </div>
        );
    }
    
    // 5. Main Render
    return (
       <div className="py-10 text-gray-800 min-h-[70vh]">

    {/* Page Heading */}
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-4 text-[#FF6347]">
        My Orders & Requests ({orders.length})
    </h1>

    <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base px-3">
        View the details of all your placed orders and adoption requests.
    </p>

    {/* Download Button */}
    <div className="flex justify-center md:justify-end max-w-7xl mx-auto px-4">
        <button
            onClick={handleDownloadReport}
            className="btn bg-[#79FFCC] border-none text-gray-900 
                       hover:bg-[#66E6B8] disabled:opacity-50 flex items-center gap-2
                       text-sm sm:text-base"
            disabled={orders.length === 0}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                 viewBox="0 0 24 24" strokeWidth={1.5} 
                 stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" 
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-8.25A3.375 3.375 0 0 0 4.5 11.625v2.625M9.75 18C8.653 18 7.63 17.566 6.843 16.857M14.25 18c1.097 0 2.12-.434 2.907-1.143M18 19.5H6" />
            </svg>
            Download Report ({orders.length})
        </button>
    </div>

    {/* If no orders */}
    {orders.length === 0 ? (
        <div className="text-center p-6 sm:p-10 bg-gray-100 rounded-xl max-w-lg mx-auto border border-gray-300 mt-8">
            <p className="text-lg sm:text-xl text-gray-600 mb-4">
                You have not placed any orders yet.
            </p>
            <Link 
                to="/pets-supplies" 
                className="my-btn inline-block bg-[#FF6347] px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg text-white hover:bg-[#E05B43] transition">
                Start Shopping/Adopting
            </Link>
        </div>
    ) : (
        
        /* Responsive Table Wrapper */
        <div className="overflow-x-auto bg-white rounded-xl shadow-2xl border border-gray-200 max-w-7xl mx-auto mt-8">
            <table className="table w-full text-gray-700 text-xs sm:text-sm md:text-base">

                {/* Table Header */}
                <thead>
                    <tr className="text-white bg-[#FF6347] text-xs sm:text-sm">
                        <th className="p-2 sm:p-3 w-6">#</th>
                        <th className="p-2 sm:p-3">Listing Name</th>
                        <th className="p-2 sm:p-3">Buyer Name</th>
                        <th className="p-2 sm:p-3">Qty</th>
                        <th className="p-2 sm:p-3">Total Price</th>
                        <th className="p-2 sm:p-3">Phone</th>
                        <th className="p-2 sm:p-3">Address</th>
                        <th className="p-2 sm:p-3">Date</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order._id} className="hover:bg-gray-50 border-b border-gray-200">
                            <td className="font-bold p-2 sm:p-3">{index + 1}</td>

                            <td className="p-2 sm:p-3">
                                <div className="font-bold text-gray-900 text-sm sm:text-base">
                                    {order.listingName || 'N/A'}
                                </div>
                                <span className="badge badge-sm bg-blue-100 text-blue-800 mt-1 border-none">
                                    {order.category || 'N/A'}
                                </span>
                            </td>

                            <td className="p-2 sm:p-3">{order.buyerName || user?.displayName}</td>
                            <td className="p-2 sm:p-3">{order.quantity || 1}</td>

                            <td className="p-2 sm:p-3 text-green-600 font-bold">
                                ৳{(order.listingPrice * order.quantity).toLocaleString()}
                            </td>

                            <td className="p-2 sm:p-3">{order.buyerPhone}</td>

                            <td className="p-2 sm:p-3">{order.buyerAddress}</td>

                            <td className="p-2 sm:p-3">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )}
</div>

    );
};

export default MyOrders;