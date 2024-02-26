import React, { useState } from "react";
import { Typography, TextField, Box, Fab } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { CustomThemeContext } from "../../contexts/CustomTheme.context";

import { validate } from "../../helpers";

export default function CreateForm({
  columns,
  handleClose,
  formHeader,
  createData,
}) {
  const { theme } = React.useContext(CustomThemeContext);

  const [newItem, setNewItem] = useState(() => {
    let result = {};

    columns.forEach((col) => {
      if (col.field === "id" || col.field === "actions") {
        return;
      } else {
        result = { ...result, [col.field]: "" };
      }
    });
    return result;
  });

  const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(true);

  const [validationRules, setValidationRules] = useState(() => {
    let result = {};

    for (const [fieldName, _] of Object.entries(newItem)) {
      const columnValidRules = columns.find(
        (col) => col.field === fieldName
      ).validation;

      result = {
        ...result,
        [fieldName]: { ...columnValidRules, error: false, errorMessage: "" },
      };
    }

    return result;
  });

  const handleChange = (event) => {
    let { name, value } = event.target;

    const updateState = (prevState) => {
      return { ...prevState, [name]: value };
    };
    setNewItem(updateState);
    validate(name, value, validationRules, setIsSaveBtnDisabled);
  };

  const handleSave = (event) => {
    event.preventDefault();
    createData(newItem);
    handleClose();
  };

  const createInputField = (col, fieldKey, fieldType) => {
    const isRequired = col.validation.required;

    return (
      <TextField
        sx={{ minWidth: "500px" }}
        onChange={handleChange}
        id={fieldKey}
        value={newItem[fieldKey]}
        name={fieldKey}
        type={fieldType}
        label={col.headerName}
        autoComplete="off"
        required={isRequired}
        error={validationRules[col.field]?.error}
        helperText={validationRules[col.field]?.errorMessage}
      />
    );
  };

  return (
    <>
      <Typography variant="h3" sx={{ marginBottom: "30px" }}>
        {formHeader}
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        {newItem &&
          React.Children.toArray(
            columns.map((col, idx) => {
              if (col.field === "id" || col.field === "actions") {
                return <></>;
              } else {
                const fieldKey = col.field;
                const fieldType = col?.type === "number" ? "number" : "text";
                return createInputField(col, fieldKey, fieldType);
              }
            })
          )}
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemeProvider theme={theme}>
            <Fab
              onClick={handleSave}
              variant="extended"
              color="mainPalette"
              sx={{ width: "20%", borderRadius: "5px", margin: "10px" }}
              disabled={isSaveBtnDisabled}
            >
              Save
            </Fab>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Fab
              onClick={() => handleClose()}
              variant="extended"
              color="mainPalette"
              sx={{ width: "20%", borderRadius: "5px", margin: "10px" }}
            >
              Cancel
            </Fab>
          </ThemeProvider>
        </div>
      </Box>
    </>
  );
}
