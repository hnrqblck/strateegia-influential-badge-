export const ButtonStyles = {
    baseStyle: {},
    sizes: {},
    variants: {
      pink: {
        bg: "pink",
        color: 'white',
        _hover: {
          bg: '#F75FFA',
          // color: 'pink',
          boxShadow: 'md'
        }
      },
      pinkOutline: {
        bg: 'none',
        color: 'pink',
        border: '1px solid #FA00FF',
        _hover: {
          bg: 'pink',
          color: 'white',
          boxShadow: 'md'
        }
      }
    },
    defaultProps: {
    },
}