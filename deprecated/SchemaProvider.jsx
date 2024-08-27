import Joi from "joi";
import { createContext, useContext, useMemo } from "react";
import { getFieldType, isFieldRequired } from "../utils/joi";

const SchemaContext = createContext();

export default function SchemaProvider({ rules, children }) {
  const schema = useMemo(() => Joi.object(rules), [rules]);
  const fields = useMemo(() => {
    const fields = {};

    Object.keys(rules).forEach(name => {
      const validator = Joi.object({ [name]: rules[name] });

      fields[name] = {
        validate: value => validator.validate({ [name]: value }),
        type: getFieldType(validator, name),
        required: isFieldRequired(validator, name)
      };
    });

    return fields;
  }, [rules]);
  const ctx = useMemo(() => ({ rules, schema, fields, }), [rules]);

  return (
    <SchemaContext.Provider value={ctx}>
      {children}
    </SchemaContext.Provider>
  );
}

export function useSchema() {
  const ctx = useContext(SchemaContext);
  if (!ctx) throw new Error("useSchema must be used within a SchemaProvider");
  return ctx;
}