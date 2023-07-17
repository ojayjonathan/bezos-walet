import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import { OwnableTransaction } from "./../utils/types";
import { Tag } from "../../shared/types";
import { MenuItem, Select } from "@mui/material";

export default function TogglableTransaction({
  transaction,
  updateMerchantTag,
  tags,
}: {
  transaction: OwnableTransaction;
  updateMerchantTag: (name: string, selected: number | null) => void;
  tags: Tag[];
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = +event.target.value;
    console.log(val);
    updateMerchantTag(transaction.merchantName, val > 0 ? val : null);
  };

  return (
    <Paper elevation={1} sx={{ backgroundColor: "primary" }}>
      <Stack direction="row" alignItems="center">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-around"
          width="100%"
          sx={{ flexWrap: "wrap", paddingLeft: 2, paddingRight: 2 }}
        >
          <Stack direction="row" minWidth="25%">
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {transaction.date.toLocaleDateString()}
            </Typography>
          </Stack>

          <Stack direction="row" minWidth="40%">
            <Typography variant="body1" sx={{ fontWeight: 800 }}>
              {transaction.merchantName}
            </Typography>
          </Stack>

          <Stack direction="row" minWidth="15%">
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              ${transaction.amount.toFixed(2)}
            </Typography>
          </Stack>
          <Select
            value={
              transaction.merchant && transaction.merchant.tagId
                ? transaction.merchant.tagId + ""
                : "-1"
            }
            onChange={handleChange}
          >
            <MenuItem value="-1">None</MenuItem>
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.id + ""}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>
    </Paper>
  );
}
