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
import { useQuery } from "@tanstack/react-query";
import ItemService from "@/services/ItemService";

const ItemsReportsTable = React.forwardRef(
  ({ items, allItemsState }: any, ref: any) => {
    const rowsPerPage = 5;
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(rowsPerPage);

    const {
      data: itemData,
      isLoading,
      isSuccess,
      // isError,
    } = useQuery({
      queryKey: ["itemData"],
      queryFn: async () => {
        return await ItemService.getAll();
      },
    });

    if (isSuccess) {
      console.log(itemData);
    }

    return (
      <>
        <Table ref={ref}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Barcode</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Retail price</TableHead>
              <TableHead>Min stock</TableHead>
              <TableHead className="text-right">Max stock</TableHead>
            </TableRow>
          </TableHeader>
          {!allItemsState ? (
            <TableBody>
              {items.length !== 0 ? (
                items.slice(startIndex, endIndex).map((item: any, idx: any) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">
                      {item.barcode}
                    </TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.retailPrice}</TableCell>
                    <TableCell>{item.minStock}</TableCell>
                    <TableCell className="text-right">
                      {item.maxStock}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="font-medium text-center " colSpan={6}>
                    No Items Yet...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          ) : isLoading ? (
            <h1>Loading</h1>
          ) : (
            <TableBody>
              {itemData.map((item: any) => (
                <TableRow key={item.item}>
                  <TableCell className="font-medium">{item.barcode}</TableCell>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.retailPrice}</TableCell>
                  <TableCell>{item.minStock}</TableCell>
                  <TableCell className="text-right">{item.maxStock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {items.length !== 0 && (
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

export default ItemsReportsTable;
