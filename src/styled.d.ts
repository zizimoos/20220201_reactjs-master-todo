import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      secondary: string;
      background: string;
      primary: string;
    };
  }
}
