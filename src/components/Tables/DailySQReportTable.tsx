/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const DailySQReportTable = React.forwardRef(({ quotations }: any, ref: any) => {
  const rowsPerPage = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  return (
    <>
      <Table ref={ref}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Code</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            {/* <TableHead>Retail price</TableHead>
            <TableHead>Min stock</TableHead>
            <TableHead className="text-right">Max stock</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotations?.length !== 0 ? (
            quotations
              ?.slice(startIndex, endIndex)
              ?.map((quo: any, idx: any) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{quo.code}</TableCell>
                  <TableCell>
                    {quo.customer.firstName} {quo.customer.secondName}
                  </TableCell>
                  <TableCell className="text-right">
                    {quo.totalAmount}
                  </TableCell>
                  {/* <TableCell>{quo.retailPrice}</TableCell>
                <TableCell>{quo.minStock}</TableCell>
                <TableCell className="text-right">{quo.maxStock}</TableCell> */}
                </TableRow>
              ))
          ) : (
            //   <div className="absolute inset-0 text-center">Loading ...</div>
            <TableRow>
              <TableCell className="font-medium text-center " colSpan={6}>
                No Items In This Date...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {quotations?.length !== 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`${
                  startIndex === 0
                    ? "pointer-events-none opacity-50"
                    : undefined
                }`}
                onClick={() => {
                  setStartIndex(startIndex - rowsPerPage);
                  setEndIndex(endIndex - rowsPerPage);
                }}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                className={`${
                  endIndex === 10 ? "pointer-events-none opacity-50" : undefined
                }`}
                onClick={() => {
                  setStartIndex(startIndex + rowsPerPage);
                  setEndIndex(endIndex + rowsPerPage);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
});

export default DailySQReportTable;
