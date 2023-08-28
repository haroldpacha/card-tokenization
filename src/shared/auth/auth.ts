import { AuthError } from '@errors/auth-error';

const TOKENS_VALIDS = [
    'pk_test_LsRBKejzCOEEWOsw',
];

export const authMiddleware = () => {
  
    const verifyAuth = async (request:any) => {
        const headers = request.event.headers;
        
        if (!headers || !headers.authorization) {
            throw new AuthError('Token not provided');
        }

        const authHeader = headers.authorization;

        if (!authHeader.startsWith('Bearer ')) {
            throw new AuthError('Invalid token format');
        }

        const token = authHeader.split(' ')[1];
        
        if(!TOKENS_VALIDS.includes(token)){
            throw new AuthError('Invalid Token');
        }
    }

    return {
        before: verifyAuth,
    }
  }


  