import { useParams } from 'react-router-dom';
import { ArrowBack } from '../components/ArrowBack';
import { FormMetadata } from '../components/FormMetadata';

export const AddMetadata = () => {
  //go back to the book
  const params = useParams();

  return (
    <div className="relative">
      <ArrowBack to={`/book/${params.id}`} />
      <FormMetadata />;
    </div>
  );
};
