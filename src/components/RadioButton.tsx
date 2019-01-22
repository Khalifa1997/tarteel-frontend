import React from "react";
import styled from "styled-components";
import T from "./T";
import KEYS from "../locale/keys";

interface IOption {
  text: KEYS;
  value: string;
}

interface IProps {
  onChange(value: string): void;
  options: IOption[];
  currentValue: string;
}

class RadioButton extends React.Component<IProps, never> {
  ref = null;
  handleChange = (e, option) => {
    if (option.value !== this.props.currentValue) {
      this.props.onChange(option)
      this.handleAnimation(e.currentTarget)
    }
  }
  handleAnimation = (el) => {
    this.ref.querySelector(".foreground").style.left = el.offsetLeft + "px";
    this.ref.querySelector(".foreground").style.width = el.offsetWidth + "px";
  }

  componentDidMount() {
    const activeOne = this.ref.querySelector("li.active")
    try {
      this.ref.querySelector(".foreground").style.left = activeOne.offsetLeft + "px";
      this.ref.querySelector(".foreground").style.width = activeOne.offsetWidth + "px";
    } catch (e) {
      console.log(e.message);
    }
  }
  render() {
    const {currentValue} = this.props;
    return (
      <Container>
        <ul ref={C => this.ref = C}>
          <span className={"foreground"}/>
          {
            this.props.options.map((option: IOption) => {
              return (
                <li className={currentValue === option.value ? "active" : ""} onClick={(e) => this.handleChange(e, option)}>
                  <T id={option.text}/>
                </li>
              )
            })
          }
        </ul>
      </Container>
    )
  }
}

const Container = styled.div`
  text-align: center;
  width: 300px;
  display: inline-block;
  
  ul {
    list-style: none;
    border-radius: 5px;
    overflow: hidden;
    background: #F2F3F8;
    color: #485364c9;
    display: flex;
    position: relative;
    padding: 0;
    margin: 7px 0;
    
    > span {
      background: #5EC49E;
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: calc(100% / 2);
      height: 100%;
      transition: 0.25s;
    }
    
    li {
      display: inline-block;
      padding: 10px;
      font-size: 10pt;
      text-transform: uppercase;
      font-weight: 600;
      font-family: "Arial";
      z-index: 5;
      position: relative;
      flex-grow: 1;
      flex-basis: 0;
      cursor: pointer;
      color: #475166;
      
      &.active ~ &:hover {
        background-color: #f5f5f8;
        color: #475166;
      }
      &.active {
        color: #ffffff;
      }
    }
  }
  
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    width: 200px;
  }
`


export default RadioButton;
