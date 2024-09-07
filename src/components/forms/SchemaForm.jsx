import { useCallback, useEffect, useMemo, useState } from "react";
import { capitalize } from "../../utils/string";
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { Loop } from "@mui/icons-material";
import PasswordInput from "./PasswordInput";

export default function SchemaForm({
  title,
  schema,
  initialValue,
  defaultValue,
  onCancel,
  onChange: changeCallback,
  onSubmit: submitCallback
}) {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(initialValue || defaultValue);
  const isValid = useMemo(() => !schema.validate(data).error, [schema, data]);

  const onChange = useCallback((name, value) => {
    const { error } = schema.fields[name].validate(value);
    setErrors(prev => ({ ...prev, [name]: error?.details[0].message }));
    setData(prev => ({ ...prev, [name]: value }));
  }, [schema, data]);

  const onReset = useCallback(() => {
    setErrors({});
    setData(defaultValue);
  }, [defaultValue]);

  const onSubmit = useCallback(() => submitCallback(data), [data]);

  useEffect(() => {
    changeCallback && changeCallback(data);
  }, [data]);

  return (
    <Box component="form" noValidate>
      <Typography align="center" variant="h5" component="h1" margin={3}>
        {capitalize(title)}
      </Typography>

      <Grid container spacing={1.5}>
        {Object.keys(schema.fields).map(name => {
          const field = schema.fields[name];
          const { type, label, required } = field;
          const grid = field.grid || (type == "boolean" ? 12 : 6);

          return (
            <Grid item key={name} xs={12} md={grid}>
              <SchemaFormInput
                value={data[name]}
                error={errors[name]}
                {...{ name, type, label, required, onChange }}
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
          id={`${name}-input`}
          type={type == "string" ? "text" : type}
          name={name}
          value={value ?? ""}
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