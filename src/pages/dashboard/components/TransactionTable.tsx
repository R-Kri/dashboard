
interface Transaction {
    id: string;
    customer: string;
    amount: string;
    status: "Completed" | "Pending" | "Failed";
    date: string;
}

interface TransactionTableProps {
    transactions: Transaction[];
    isLoading: boolean;
}

export default function TransactionTable({ transactions, isLoading }: TransactionTableProps) {
    const getStatusClasses = (status: Transaction["status"]) => {
        switch (status) {
            case "Completed":
                return "bg-green-100 text-green-800";
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "Failed":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/40">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                        >
                            Transaction ID
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                        >
                            Customer
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                        >
                            Amount
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                        >
                            Status
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                        >
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                    {isLoading ? (
                        // Loading skeleton
                        Array(5).fill(0).map((_, index) => (
                            <tr key={index} className="animate-pulse">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-3 bg-muted rounded w-16"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-3 bg-muted rounded w-24"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-3 bg-muted rounded w-16"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-5 bg-muted rounded w-20"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-3 bg-muted rounded w-20"></div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        transactions.map((transaction, index) => (
                            <tr key={index} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                                    {transaction.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                    {transaction.customer}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                    {transaction.amount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusClasses(transaction.status)}`}
                                    >
                                        {transaction.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                    {transaction.date}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
