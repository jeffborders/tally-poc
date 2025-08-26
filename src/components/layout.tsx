import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Helmet } from 'react-helmet';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en" className={roboto.variable}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Tally POC</title>
    </Helmet>
    <body>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;