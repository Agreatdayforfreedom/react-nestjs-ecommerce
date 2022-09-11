import { useContext } from 'react';
import { AuthContext, AuthContextProps } from '../AuthProvider';

const useAuth = () => useContext<AuthContextProps>(AuthContext);

export default useAuth;
