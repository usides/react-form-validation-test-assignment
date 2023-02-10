import { useCallback, useState } from "react";

export const useErrors = <T extends object, K extends keyof T>(
  fields: Record<K, { value: string; validatorFunction: (valOne: string, valTwo?: string) => false | string }>,
): { validate: () => boolean; errors: Record<K, null | string> } => {
  const [errors, setErrors] = useState(() =>
    Object.keys(fields).reduce(
      (errorsObj, currField) => ({ [currField]: null, ...errorsObj }),
      {} as Record<K, null | string>,
    ),
  );

  const validate = useCallback(() => {
    let isValid = true;
    for (let label of Object.keys(fields)) {
      const error = fields[label as K].validatorFunction(fields[label as K].value, fields["password" as K].value);
      if (error !== false) {
        setErrors((prev) => ({ ...prev, [label]: error }));
        isValid = false;
      } else {
        setErrors((prev) => ({ ...prev, [label]: null }));
      }
    }
    return isValid;
  }, [fields]);

  return { validate, errors };
};
