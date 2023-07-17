import React from "react";
import Stack from "@mui/material/Stack";

import TogglableTransaction from "./../shared/TogglableTransaction";
import { Tag, Transaction } from "./../../shared/types";
import { OwnableTransaction } from "utils/types.ts";

export default function TransactionList({
  transactions,
  tags,
  updateMerchantTag,
}: {
  transactions: OwnableTransaction[];
  updateMerchantTag: (name: string, selected: number | null) => void;
  tags: Tag[];
}) {
  return (
    <Stack spacing={1}>
      {transactions.map((transaction: Transaction): JSX.Element => {
        return (
          <TogglableTransaction
            tags={tags}
            key={transaction.id}
            transaction={transaction}
            updateMerchantTag={updateMerchantTag}
          />
        );
      })}
    </Stack>
  );
}
