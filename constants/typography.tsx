export const typography = {
    header: {
      fontFamily: 'Inter',
      fontSize: 16,
      lineHeight: 24,
      variants: {
        regular: {
          fontWeight: "400",
        },
        medium: {
          fontWeight: "500",
        }
      }
    },
    text: {
      lg: {
        fontSize: 14,   
        lineHeight: 21,
        variants: {
          regular: {
            fontWeight:' 400',
          },
          medium: {
            fontWeight: '500',
          },
          bold: {
            fontWeight: '700',
          }
        }
      },
      md: {
        fontSize: 14,
        lineHeight: 21,
        variants: {
          regular: {
            fontWeight: '400',
          },
          medium: {
            fontWeight: '500',
          },
          bold: {
            fontWeight:' 700',
          }
        }
      },
      sm: {
        fontSize: 14,
        lineHeight: 21,
        variants: {
          regular: {
            fontWeight: '400',
          },
          medium: {
            fontWeight: '500',
          },
          bold: {
            fontWeight: '700',
          }
        }
      }
    }
  };
  
//   // Types pour la typographie
//   export type TypographyVariant = keyof typeof typography;
//   export type TextSize = keyof typeof typography.text;
//   export type VariantWeight = 'regular' | 'medium' | 'bold';