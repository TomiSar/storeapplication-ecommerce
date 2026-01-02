/* eslint-disable @typescript-eslint/no-empty-object-type */
export type ActionResult<TSuccess = void, TErrors = unknown> =
  | ({ success: true } & (TSuccess extends void ? {} : TSuccess))
  | {
      success: false;
      errors: TErrors;
      message?: string;
    };
