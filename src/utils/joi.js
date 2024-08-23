export function isFieldRequired(schema, fieldName) {
  const fieldSchema = schema._ids._byKey.get(fieldName).schema;
  return fieldSchema?._flags?.presence == "required";
}

export function getFieldType(schema, fieldName) {
  const fieldSchema = schema._ids._byKey.get(fieldName).schema;
  return fieldSchema?.type;
}