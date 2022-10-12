import { useParams } from 'react-router-dom';
import { ArrowBack } from '../components/ArrowBack';
import { FormMetadata } from '../components/FormMetadata';

export const AddMetadata = () => {
  //go back to the book
  const params = useParams();

  return (
    <div>
      <div className="relative pb-10">
        <ArrowBack to={`/book/${params.id}`} />
      </div>
      <FormMetadata />;
    </div>
  );
};
