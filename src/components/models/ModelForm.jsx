import Joi from "joi";
import { useCallback, useMemo, useState } from "react";
import { capitalize } from "../../utils/string";
import { getFieldType, isFieldRequired } from "../../utils/joi";
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { Loop } from "@mui/icons-material";

export default function ModelForm({ title, model, schema, onCancel, onSubmit }) {
  schema ??= model.constructor.schema;
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(model.toForm());
  const joiSchema = useMemo(() => Joi.object(schema), [schema]);
  const labels = model.constructor.labels;
  const isValid = useMemo(() => {
    const { error } = joiSchema.validate(data);
    return !!error;
  }, [schema, data]);
  const onChange = useCallback((name, value) => {
    const { error } = Joi.object({ [name]: schema[name] }).validate({ [name]: value });
    setErrors(prev => ({ ...prev, [name]: error?.details[0].message }));
    setData(prev => ({ ...prev, [name]: value }));
  }, [schema]);
  const onReset = useCallback(() => {
    setErrors({});
    setData(model.toForm());
  }, [setErrors, setData]);
  const _onSubmit = useCallback(() => onSubmit(data), [data]);

  return (
    <Box component="form" noValidate>
      <Typography align="center" variant="h5" component="h1">
        {capitalize(title)}
      </Typography>

      <Grid container>
        {Object.keys(schema).map(prop => {
          const type = getFieldType(joiSchema, prop);

          return (
            <Grid item key={prop} xs={12} md={type == "boolean" ? 12 : 6}>
              <ModelFormInput
                name={prop}
                value={data[prop]}
                label={labels[prop]}
                error={errors[prop]}
                required={isFieldRequired(joiSchema, prop)}
                {...{ type, schema, onChange }}
              />
            </Grid>
          );
        })}
      </Grid>

      <ModelFormButtons {...{ isValid, onCancel, onReset }} onSubmit={_onSubmit} />
    </Box>
  );
}

export function ModelFormInput({ name, type, value, label, error, required, onChange }) {
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

export function ModelFormButtons({ isValid, onCancel, onReset, onSubmit }) {
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