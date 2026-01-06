/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { Profile } from '../types';

// Common Action Result Type Response: Success or Errors
export type ActionResult<TSuccess = void, TErrors = unknown> =
  | ({ success: true } & (TSuccess extends void ? {} : TSuccess))
  | {
      success: false;
      errors: TErrors;
      message?: string;
    };

/* ---------- COMMON FIELDS ---------- */
export interface BaseFormData {
  name: string;
  email: string;
  mobileNumber: string;
}

// Generic Field Error Map Type
export type FieldErrorMap<T extends object> = Partial<Record<keyof T, string>>;

/* ---------- ADDITIONAL FIELDS ---------- */
export interface MessageField {
  message: string;
}

export interface PasswordField {
  password: string;
}

/* ---------- CONTACT ---------- */
export interface ContactFormData extends BaseFormData, MessageField {}
// export interface ContactErrors extends Partial<ContactFormData> {} OLD TYPE
export type ContactErrors = FieldErrorMap<ContactFormData>;
export type ContactResult = ActionResult<void, ContactErrors>;

/* ---------- LOGIN ---------- */
export interface LoginFormData extends PasswordField {
  username: string;
}
export interface LoginSuccess extends MessageField {
  user: unknown;
  jwtToken: string;
}
// export interface LoginErrors extends Partial<MessageField> {} OLD TYPE
export type LoginErrors = Partial<Record<keyof MessageField, string>>;
export type LoginResult = ActionResult<LoginSuccess, LoginErrors>;

/* ---------- REGISTER ---------- */
export interface RegisterFormData extends BaseFormData, PasswordField {}
export interface RegisterSuccess extends MessageField {}
// export interface RegisterErrors extends Partial<RegisterFormData>, Partial<MessageField> {} OLD TYPE
export type RegisterErrors = FieldErrorMap<RegisterFormData> &
  Partial<Record<keyof MessageField, string>>;
export type RegisterResult = ActionResult<RegisterSuccess, RegisterErrors>;

/* ---------- PROFILE ---------- */
export interface ProfileFormData extends BaseFormData {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

// export interface ProfileErrors extends Partial<ProfileFormData> {} OLD TYPE
export interface ProfileSuccess {
  profileData: Profile;
  emailUpdated?: boolean;
  message?: string;
}
export type ProfileErrors = FieldErrorMap<ProfileFormData>;
export type ProfileResult = ActionResult<ProfileSuccess, ProfileErrors>;
