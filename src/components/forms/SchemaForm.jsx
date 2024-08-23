import { useCallback, useMemo, useState } from "react";
import { capitalize } from "../../utils/string";
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { Loop } from "@mui/icons-material";
import { useSchema } from "../../providers/SchemaProvider";

export default function SchemaForm({ title, defaultValue, labels, onCancel, onSubmit: submitCallback }) {
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
      <Typography align="center" variant="h5" component="h1">
        {capitalize(title)}
      </Typography>

      <Grid container>
        {Object.keys(fields).map(name => {
          const { type, required } = fields[name];

          return (
            <Grid item key={name} xs={12} md={type == "boolean" ? 12 : 6}>
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
  return type == "boolean" ?
    <FormControlLabel
      id={`${name}-checkbox`}
      name={name}
      label={capitalize(label || name)}
      control={<Checkbox value={value} />}
      onChange={e => onChange(name, e.target.checked)}
    /> :
    <TextField
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
    />;
}

export function SchemaFormButtons({ isValid, onCancel, onReset, onSubmit }) {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Button variant="outlined" color="error" fullWidth onClick={onCancel}>
          Cancel
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="outlined" color="primary" fullWidth onClick={onReset}>
          <Loop />
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button size="large" color="primary" fullWidth disabled={!isValid} onClick={onSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}