import { extendTheme } from '@chakra-ui/react';
import { ButtonStyles as Button } from './components/buttonStyles';

export const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: '#010221',
                color: '#F9F6FF',
            }
        },

    },
        colors: {
            transparent: 'transparent',
            darkBlue: '#010221',
            mediumBlue: '#09093B',
            mediumWhite: '##D8D8D8',
            pink: '#FA00FF',
            white: '#fff',
            lilac: '#6364EE',
            gray: '#9E9D9D',
            red: '#92131B'
        },
        fonts: {
            body: 'Poppins',
        },
        fontSizes: {
            xs: "0.75rem", // 12px
            sm: "0.875rem", // 14px
            md: "1rem", // 16px
            lg: "1.5rem", // 24px
            xl: "2rem", // 32px
            '2xl': "3.75rem", //60px
        },
        fontWeights: {
            normal: 400,
            medium: 500,
            bold: 700,
          },
        lineHeights: {
            normal: "normal",
            none: 1,
            body6: '18px',
            body5: '21px',
            body43: '24px',
            body21: "36px",
            heading3: "36px",
            heading2: "48px",
            heading1: "90px",
        },
        breakpoints: {
            sm: '320px',
            md: '744px',
            lg: '62em',
            xl: '80em',
            '2xl': '1440px',
        },
        components: {
            Button,
        },
        config: {
            cssVarPrefix: 'ck',
        },
    
    
});