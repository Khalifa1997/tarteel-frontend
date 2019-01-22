import React from "react";
import Select, {components} from 'react-select';
import styled from "styled-components";
import countries from "i18n-iso-countries"
// import Flag from 'react-world-flags'
import Truncate from "react-truncate";



interface IProps {
  locale: string;
  isRtl?: boolean;
  currentValue: string;
  onChange(): void;
}

const ValueContainer = ({ children,selectProps, ...props }) => {
  const currentOption = selectProps.value || {value: ""};
  return (
    <components.ValueContainer {...props}>
      {/*<Flag style={{marginRight: "10px"}} code={ currentOption.value } height={15} width={20} />*/}
      {children}
    </components.ValueContainer>
  )
};

const CustomOption = ({ innerProps, isDisabled, selectProps, label, value}: any) => {
  const currentOption = selectProps.value || {value: ""};
  return !isDisabled ? (
    <Container {...innerProps} className={value === currentOption.value ? "active" : ""}>
      {/*<Flag style={{marginRight: "20px"}} code={value} height={15} width={20}/>*/}
      <Truncate
        lines={1}
        ellipsis='...'
        trimWhitespace
      >
        { label }
      </Truncate>
    </Container>
  ) : null;

}

class CountryList extends React.Component<IProps, never> {
  render() {
    if (this.props.locale === "arabic") {
      countries.registerLocale(require("i18n-iso-countries/langs/ar.json"));
    } else {
      countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    }

    const locale = this.props.locale.toLowerCase().slice(0, 2); // ex: ar, en

    const countriesObj = countries.getNames(locale);
    const list = Object.keys(countriesObj).map((key) => {
      return {
        label: countriesObj[key],
        value: key,
      }
    });
    const selectedEthnicity = list.filter(opt => opt.value === this.props.currentValue)[0]

    return (
      <Select
        isRtl={this.props.isRtl}
        isSearchable={true}
        defaultValue={selectedEthnicity}
        className={"select"}
        options={list}
        components={{ Option: CustomOption, ValueContainer }}
        onChange={(option) => this.props.onChange(option)}
      />
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-flow: row;
  padding: 1em; 
  text-wrap: none;
  
  &:hover {
    background-color: #E0EAFC;
  }
  &.active {
    background-color: #4482F7;
    color: ${props => props.theme.colors.white};
  }
`

export default CountryList;
