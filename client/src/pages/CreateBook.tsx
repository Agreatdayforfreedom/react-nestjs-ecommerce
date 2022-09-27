import { ArrowBack } from '../components/ArrowBack';
import { FormBook } from '../components/FormBook';

export const CreateBook = () => {
  return (
    <>
      <section className="relative mx-2">
        <ArrowBack to="/admin" />
        <FormBook />
      </section>
    </>
  );
};
