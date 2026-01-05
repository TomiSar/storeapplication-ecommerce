import type { ActionResult } from '../../actions/types';

type FieldErrorProps<TErrors extends object> = {
  actionData?: ActionResult<unknown, TErrors>;
  field: keyof TErrors;
};

export default function FieldError<TErrors extends object>({
  actionData,
  field,
}: FieldErrorProps<TErrors>) {
  if (!actionData || actionData.success) return null;
  const error = actionData.errors?.[field];
  if (!error) return null;

  return <p className="text-red-500 text-sm mt-1">{String(error)}</p>;
}
