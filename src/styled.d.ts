import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      primary: string;
      secondary: string;
      bgColor: string;
      boardColor: string;
      cardColor: string;
    };
  }
}
