import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Tag, Transaction } from "../../shared/types";
import { OwnableTransaction } from "../utils/types";

type StatsProps = {
  tags: Tag[];
  transactions: OwnableTransaction[];
  total:number
};

export default function Stats({ tags, transactions,total }: StatsProps) {
  const getTotalAmountByTag = (tagId: number): number => {
    return transactions
      .filter((transaction) => transaction.merchant?.tagId === tagId)
      .reduce((total, transaction) => total + transaction.amount, 0);
  };
 
  return (
    <Stack>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          borderRadius: 5,
          maxWidth: 500,
          width: "100%",
          marginBottom: 2,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h4" color="secondary.main">
            Your contribution
          </Typography>
          <table>
            <thead>
              <tr>
                <th>Tag</th>
                <th>Total Amount</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => (
                <tr key={tag.id}>
                  <td>{tag.name}</td>
                  <td>${getTotalAmountByTag(tag.id).toFixed(2)}</td>
                  <td>
                    {((getTotalAmountByTag(tag.id) / total) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Stack>
      </Paper>
    </Stack>
  );
}
