import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { serverRoutes } from '../router/app.routes.server';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
