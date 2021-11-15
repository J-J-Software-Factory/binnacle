import { Route } from '@angular/router';

export const webClientShellRoutes: Route[] = [
  {
    path: 'users',
    loadChildren: async () =>
      (await import('@nx-admin-starter/web-client/modules/user')).UserModule,
  },
];
