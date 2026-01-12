import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets/monaco/vs' 
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),     
    importProvidersFrom(
      MonacoEditorModule.forRoot(monacoConfig),
      FormsModule
    ),
  ]
};