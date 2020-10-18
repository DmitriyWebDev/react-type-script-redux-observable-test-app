declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare const FRONTEND_APP_VERSION: string;
