interface PriceProps {
  currency: string;
  price: number;
}

export default function Price({ price, currency }: PriceProps) {
  return (
    <>
      <span className='text-base sm:text-lg font-medium text-primary'>
        {price}
      </span>
      <span className='text-sm  text-primary'>{currency}</span>
    </>
  );
}
