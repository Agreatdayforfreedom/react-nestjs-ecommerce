import { OrderDetails } from '../interfaces';

interface Props {
  od: OrderDetails;
}

export const OrderDetail = ({ od }: Props) => {
  return (
    <section className="md:w-full md:border">
      <div className="flex justify-between my-2 p-2 border-y md:border-none transition-all">
        <div className="flex">
          <img src={od.book.image} alt={od.book.name} className="w-14" />

          <div className="mx-3">
            <h2 className="font-bold">{od.book.name}</h2>
            <p className="text-green-600">
              ${od.book.price} x{' '}
              <span className="font-serif font-bold text-blue-600 text-lg">
                {od.quantity}
              </span>
            </p>
            <h2>{od.book.author}</h2>
          </div>
        </div>
      </div>
    </section>
  );
};
