interface BootstrapButtonProps {
  text: string;
  type?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
    | 'link';
}

export default function BootstrapButton({ text, type }: BootstrapButtonProps) {
  return <button className={`btn btn-${type}`}>{text}</button>;
}
