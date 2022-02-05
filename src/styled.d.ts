import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      bgColor: string;
      boardColor: string;
      cardColor: string;
    };
  }
}
