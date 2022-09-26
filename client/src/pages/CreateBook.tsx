import { ArrowReturn } from '../components/ArrowReturn';
import { FormBook } from '../components/FormBook';

export const CreateBook = () => {
  return (
    <>
      <section className="relative mx-2">
        <ArrowReturn to="/admin" />
        <FormBook />
      </section>
    </>
  );
};
