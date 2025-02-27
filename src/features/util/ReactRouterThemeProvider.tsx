import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { LinkProps } from "@mui/material/Link";
import { forwardRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Globally changes the behavior of MUI Link to use react-router (otherwise our caching dies every time you click a link)
// https://mui.com/material-ui/integrations/routing/?srsltid=AfmBOorr5RcgkoniUkNUM2aN5CqRYgWH0CcFEjy0058pzvoQJpTm1f_b#global-theme-link

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

export const ReactRouterThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
