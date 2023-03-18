import Slider from "rc-slider";
import styled from "styled-components";
import variables from "../../../../variables";

export const RandomPointModeSelector = styled.div`
    margin: 0 10vw;
    display: flex;
    justify-content: space-between;
    align-items: center;


    & .flex-item {
        flex: 1;
        flex-basis: 0;
        font-size: clamp(12px, 2vw, 24px);
    }

    & > span.first {
        text-align: start;
        display: flex;
        align-items: center;
    }

    & > span.last {
        display: flex;
        align-items: center;
        justify-content: end;
    }
`


export const CustomSliderWrapper = styled.div`
    width: 80%;
    text-align: center;

`

export const CustomSliderLabelsWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 5%;
    margin-right: 0;
    position: relative;

    & > span {
        font-size: clamp(12px, 2vw, 24px);
    }
`

export const CustomSilder = styled(Slider)`
    width: 90%;
    & .rc-slider-handle {
        margin-top: -10px;
        width: 24px;
        height: 24px;
        border-color: ${variables.primaryColor};
        background-color: ${variables.primaryColor};
    }

    & .rc-slider-track {
        background-color: ${variables.primaryColorLighter};
    }

    &.rc-slider-disabled {
        background: none;
        & .rc-slider-track {
            background-color: ${variables.disabledColor};
        }  
        & .rc-slider-handle {
            background-color: ${variables.disabledColor};
            border-color: ${variables.disabledColor};
        }
    }

`


