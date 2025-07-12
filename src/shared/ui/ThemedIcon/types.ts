export type IconSvgObject =
  | Array<
      [
        string,
        {
          [key: string]: string | number;
        },
      ]
    >
  | ReadonlyArray<
      readonly [
        string,
        {
          readonly [key: string]: string | number;
        },
      ]
    >;
