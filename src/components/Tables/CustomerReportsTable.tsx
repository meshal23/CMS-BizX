/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  //   TableFooter,
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
import { useQuery } from "@tanstack/react-query";
import CustomerServices from "@/services/CustomerServices";

const CustomerReportsTable = React.forwardRef(
  ({ customers, allCustomersState }: any, ref: any) => {
    const rowsPerPage = 5;
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(rowsPerPage);

    const {
      data: customerData,
      isLoading,
      // isError,
      isSuccess,
    } = useQuery({
      queryKey: ["customerData"],
      queryFn: async () => {
        return await CustomerServices.getAll();
      },
    });

    if (isSuccess) {
      console.log(customerData);
    }

    // if (isError) {
    //   return toast.error("Getting customer data failed");
    // }
    return (
      <>
        <Table ref={ref}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone No</TableHead>
              <TableHead className="text-right">Address</TableHead>
            </TableRow>
          </TableHeader>
          {!allCustomersState ? (
            <TableBody>
              {customers.length !== 0 ? (
                customers.map((customer: any, idx: any) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell>{customer.code}</TableCell>
                    <TableCell>
                      {customer.firstName} {customer.secondName}
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone1}</TableCell>
                    <TableCell className="text-right">
                      {customer.customerAddresses[0]?.address}{" "}
                      {customer.customerAddresses[0]?.city}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                //   <div className="absolute inset-0 text-center">Loading ...</div>
                <TableRow>
                  <TableCell className="font-medium text-center " colSpan={6}>
                    No Customers Yet...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          ) : isLoading ? (
            <h1>Loading</h1>
          ) : (
            <TableBody>
              {customerData?.map((customer: any, idx: any) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>{customer.code}</TableCell>
                  <TableCell>
                    {customer.firstName} {customer.secondName}
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone1}</TableCell>
                  <TableCell className="text-right">
                    {customer.customerAddresses[0]?.address}{" "}
                    {customer.customerAddresses[0]?.city}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {customers.length !== 0 && (
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
                    endIndex === 10
                      ? "pointer-events-none opacity-50"
                      : undefined
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
  }
);

export default CustomerReportsTable;
