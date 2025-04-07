import { CanActivateFn } from '@angular/router';

export const testRouteGuard: CanActivateFn = (route, state) => {
  console.log('[testRouteGuard] test de passage avec :', { stateUrl: state.url })
  return true;
};
