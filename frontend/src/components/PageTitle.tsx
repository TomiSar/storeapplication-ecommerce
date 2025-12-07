interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <h1 className='text-3xl font-primary font-extrabold text-center text-primary mt-4 py-2'>
      {title}
    </h1>
  );
}
