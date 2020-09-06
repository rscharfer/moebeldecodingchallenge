
import { createGlobalStyle } from 'styled-components'

// const GlobalStyle = createGlobalStyle`
//   body {
//     color: ${props => (props.whiteColor ? 'white' : 'black')};
//   }
// `

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background: ${props => props.bgColor};
    height: 100%
  }
`

export default GlobalStyle;