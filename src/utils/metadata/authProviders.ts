
export interface AuthProvider {
  id: string;
  name: string;
  icon: string;
  type: 'social' | 'email';
}

export const authProviders: AuthProvider[] = [
  {
    id: 'email',
    name: 'Sign In with Email',
    icon: 'LogIn',
    type: 'email'
  },
  {
    id: 'google',
    name: 'Sign In with Google',
    icon: 'google',
    type: 'social'
  },
  {
    id: 'facebook',
    name: 'Sign In with Facebook',
    icon: 'Facebook',
    type: 'social'
  },
  {
    id: 'instagram',
    name: 'Sign In with Instagram',
    icon: 'Instagram',
    type: 'social'
  }
];
