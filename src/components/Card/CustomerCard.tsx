/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CustomerCard({ name, phone1, email, key }: any) {
  return (
    <Card key={key} className="w-[350px] tablet:w-[550px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Customer Details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between m-1">
          <span className="tracking-wider tablet:text-xl font-lato-extrabold">
            Phone:{" "}
          </span>
          <span className="tracking-wider tablet:text-xl font-lato-extrabold">
            {phone1}
          </span>
        </div>
        <div className="flex justify-between gap-3 m-1">
          <span className="tracking-wider tablet:text-xl text-ellipsis font-lato-extrabold">
            Email:{" "}
          </span>
          <span className="overflow-hidden tracking-wider tablet:text-xl font-lato-extrabold">
            {email}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
