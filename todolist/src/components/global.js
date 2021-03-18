import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
    * {
        box-sizing: border-box;
        background-color: black;
    }

    ::-webkit-input-placeholder  { 
        color: #fb743e;
        opacity: 0.3;
    }

    input:-moz-placeholder { 
        color: #fb743e;
        opacity: 0.3; 
    }
`