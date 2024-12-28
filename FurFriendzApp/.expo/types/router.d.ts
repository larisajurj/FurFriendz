/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/loginPage`; params?: Router.UnknownInputParams; } | { pathname: `/mapPage`; params?: Router.UnknownInputParams; } | { pathname: `/registerPage`; params?: Router.UnknownInputParams; } | { pathname: `/registerType`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/about` | `/about`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | ``; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/search` | `/search`; params?: Router.UnknownInputParams; } | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/loginPage`; params?: Router.UnknownOutputParams; } | { pathname: `/mapPage`; params?: Router.UnknownOutputParams; } | { pathname: `/registerPage`; params?: Router.UnknownOutputParams; } | { pathname: `/registerType`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/about` | `/about`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}` | ``; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/search` | `/search`; params?: Router.UnknownOutputParams; } | { pathname: `/+not-found`, params: Router.UnknownOutputParams & {  } };
      href: Router.RelativePathString | Router.ExternalPathString | `/loginPage${`?${string}` | `#${string}` | ''}` | `/mapPage${`?${string}` | `#${string}` | ''}` | `/registerPage${`?${string}` | `#${string}` | ''}` | `/registerType${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/about${`?${string}` | `#${string}` | ''}` | `/about${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${`?${string}` | `#${string}` | ''}` | `${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/search${`?${string}` | `#${string}` | ''}` | `/search${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/loginPage`; params?: Router.UnknownInputParams; } | { pathname: `/mapPage`; params?: Router.UnknownInputParams; } | { pathname: `/registerPage`; params?: Router.UnknownInputParams; } | { pathname: `/registerType`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/about` | `/about`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | ``; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/search` | `/search`; params?: Router.UnknownInputParams; } | `/+not-found` | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
    }
  }
}
