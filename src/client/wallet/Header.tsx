import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Chip } from "@mui/material";

interface HeaderProps {
  tags: any[];
  createTag: (name: string) => void;
}

const Header: React.FC<HeaderProps> = ({ tags, createTag }) => {
  const [newTagName, setNewTagName] = useState("");

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Tags:</Typography>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        {tags.map((tag) => (
          <Chip
            key={tag.id}
            label={tag.name}
            color="primary"
            variant="outlined"
            sx={{
              marginRight: "8px",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              marginTop: "1rem",
            }}
          />
        ))}
        <TextField
          sx={{
            marginTop: "1rem",
          }}
          label="add new tag"
          variant="outlined"
          size="small"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTag(newTagName);
              setNewTagName("");
            }
          }}
        />
      </div>
      <small>To a new tag, type the tag name and press enter key</small>

      <Typography variant="h4" sx={{ fontWeight: 300 }}>
        Transaction History
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center" pl={1}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Month
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year", "month"]}
            label="Year and Month"
            minDate={new Date("2020-01-31")}
            maxDate={new Date("2029-06-01")}
            value={new Date("2029-01-31")}
            onChange={() => console.log("Not implemented :)")}
            renderInput={(params: any) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
      </Stack>
    </Stack>
  );
};

export default Header;
