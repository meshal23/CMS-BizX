/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SalesQuotationTable({
  stockHistoryTemps,
  calculateTotals,
  updateFieldValues,
}: any) {
  const { totalSubTotalAmount, totalTotalAmount, revisedTotal } =
    calculateTotals();

  console.log(totalSubTotalAmount, totalTotalAmount);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    updateFieldValues(name, value);
  };

  return (
    <Table>
      <TableCaption>A list of your recent items.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Item</TableHead>
          <TableHead>Qty</TableHead>
          <TableHead>Retail Price</TableHead>
          <TableHead>Dis %</TableHead>
          <TableHead>Dis Amt</TableHead>
          <TableHead className="text-right">Sum</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stockHistoryTemps.map((invoice: any) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">
              {invoice.itemMaster.name}
            </TableCell>
            <TableCell>{invoice.quantity}</TableCell>
            <TableCell>{invoice.itemMaster.retailPrice}</TableCell>
            <TableCell>{invoice.discountPercentage}</TableCell>
            <TableCell>{invoice.discountAmount}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell width={10} colSpan={2}>
            <input
              type="number"
              id="helper-text"
              name="discountPercentage"
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Dis %"
            />
          </TableCell>
          <TableCell width={10} colSpan={2}>
            <input
              type="number"
              id="helper-text"
              name="discountAmount"
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Dis Amt"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={5} className="text-xl font-lato-bold">
            Total
          </TableCell>
          <TableCell className="text-xl text-right font-lato-bold">
            {revisedTotal}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
