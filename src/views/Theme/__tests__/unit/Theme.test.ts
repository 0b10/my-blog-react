import { getTheme, ThemeNames, ThemeName } from "../../themes";
import { ThemeError } from "../../error";

describe("unit tests: Theme", () => {
  describe("getTheme()", () => {
    const themes: ThemeNames<ThemeName> = { light: "light", dark: "dark" };

    Object.values(themes).forEach((themeName) => {
      describe(`given ${themeName} as an argument`, () => {
        it("should return a defined value", () => {
          expect(getTheme(themeName)).toBeDefined();
        });

        it("should return an object with an expected shape", () => {
          const expectedKeys = [
            "breakpoints",
            "direction",
            "mixins",
            "overrides",
            "palette",
            "props",
            "shadows",
            "shape",
            "spacing",
            "transitions",
            "typography",
            "zIndex",
          ];
          const sortAlpha = (a: string, b: string) => (a < b ? -1 : 1);

          expectedKeys.sort(sortAlpha);
          const result = Object.keys(getTheme(themeName));
          result.sort(sortAlpha);

          expect(result).toStrictEqual(expectedKeys);
        });
      });
    });

    describe(`given "invalid-theme-name" as an argument`, () => {
      it("should throw", () => {
        expect(() => {
          getTheme("invalid-theme-name" as "dark");
        }).toThrow(ThemeError);
      });
    });
  });
});
