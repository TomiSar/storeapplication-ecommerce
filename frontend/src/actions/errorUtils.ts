import type { AxiosError } from 'axios';
import type { ActionResult } from './types';

export type ApiError<T> = AxiosError<T>;

export function mapApiError<TSuccess, TErrors extends object>(
  error: unknown,
  fallbackMessage = 'Something went wrong',
): ActionResult<TSuccess, TErrors> {
  const err = error as ApiError<TErrors>;

  if (err.response?.status === 400 && err.response.data) {
    return {
      success: false,
      errors: err.response.data,
    } as ActionResult<TSuccess, TErrors>;
  }

  return {
    success: false,
    errors: {} as TErrors,
    message:
      (typeof err.response?.data === 'object' &&
      err.response?.data &&
      'errorMessage' in err.response.data
        ? String((err.response.data as { errorMessage?: unknown }).errorMessage)
        : err.message) || fallbackMessage,
  } as ActionResult<TSuccess, TErrors>;
}
