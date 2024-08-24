import { useCallback, useMemo, useState } from "react";
import { capitalize } from "../../utils/string";
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { Loop } from "@mui/icons-material";
import { useSchema } from "../../providers/SchemaProvider";
import PasswordInput from "./PasswordInput";

const formStyles = {
  input: {
    backgroundColor: "#EEF5FC",
    color: "white",
  }
};

export default function SchemaForm({
  title,
  defaultValue,
  labels,
  structure = {},
  onCancel,
  onSubmit: submitCallback
}) {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(defaultValue);
  const { schema, fields } = useSchema();
  const isValid = useMemo(() => !schema.validate(data).error, [schema, data]);

  const onChange = useCallback((name, value) => {
    const { error } = fields[name].validate(value);
    setErrors(prev => ({ ...prev, [name]: error?.details[0].message }));
    setData(prev => ({ ...prev, [name]: value }));
  }, [fields]);

  const onReset = useCallback(() => {
    setErrors({});
    setData(defaultValue);
  }, [defaultValue]);

  const onSubmit = useCallback(() => submitCallback(data), [data]);

  return (
    <Box component="form" noValidate>
      <Typography align="center" variant="h5" component="h1" margin={3}>
        {capitalize(title)}
      </Typography>

      <Grid container spacing={1.5}>
        {Object.keys(fields).map(name => {
          const { required } = fields[name];
          const type = structure[name]?.type || fields[name].type;
          const grid = structure[name]?.grid || (type == "boolean" ? 12 : 6);

          return (
            <Grid item key={name} xs={12} md={grid}>
              <SchemaFormInput
                value={data[name]}
                label={labels[name]}
                error={errors[name]}
                {...{ name, type, required, onChange }}
              />
            </Grid>
          );
        })}
      </Grid>

      <SchemaFormButtons {...{ isValid, onCancel, onReset, onSubmit }} />
    </Box>
  );
}

export function SchemaFormInput({ name, type, value, label, error, required, onChange }) {
  let Component = TextField;

  switch (type) {
    case "boolean":
      return (
        <FormControlLabel
          id={`${name}-checkbox`}
          name={name}
          label={capitalize(label || name)}
          control={<Checkbox value={value} />}
          onChange={e => onChange(name, e.target.checked)}
        />
      );
    case "password":
      Component = PasswordInput;
    default:
      return (
        <Component
          sx={formStyles.input}
          id={`${name}-input`}
          type={type == "string" ? "text" : type}
          name={name}
          value={value || ""}
          label={capitalize(label || name)}
          required={required}
          helperText={error}
          error={!!error}
          onChange={e => onChange(name, e.target.value)}
          fullWidth
          autoComplete="off"
        />
      );
  }
}

export function SchemaFormButtons({ isValid, onCancel, onReset, onSubmit }) {
  return (
    <Grid container spacing={1.5} my={0.5}>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" color="error" fullWidth onClick={onCancel}>
          Cancel
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" color="primary" fullWidth onClick={onReset}>
          <Loop />
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button size="large" color="primary" variant="contained" fullWidth disabled={!isValid} onClick={onSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}