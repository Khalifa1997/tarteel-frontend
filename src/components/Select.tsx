import React from 'react';
import Select from 'react-select';
import theme from '../theme';

const Container = (props: any) => {
  return (
    <Select
      {...props}
      theme={(defaultTheme: any) => ({
        ...defaultTheme,
        borderRadius: 5,
        colors: {
          ...defaultTheme.colors,
          primary25: theme.colors.brandHover,
          primary: theme.colors.linkColor,
        },
      })}
    />
  );
};

export default Container;
