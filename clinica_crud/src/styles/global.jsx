import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'poppins', sans-serif;
    }
    body{
        background-color: #f0f0f0;
        display: flex;
        justify-content: center;
    }
`;

export default Global;
