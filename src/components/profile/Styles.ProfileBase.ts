import { IonAvatar } from "@ionic/react";
import styled from "styled-components";
import { BaseButton } from "../../theme/Styles.Base";
import variables from "../../variables";

export const ProfileContentWrapper = styled.div`
    color: black;
    padding: 5%;
`

export const ProfileTopIconsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 5vh 10vw;
    gap: 5%;
`


export const ProfileTopButton = styled(BaseButton)`
    background: none;
    &:enabled:hover, &:enabled:active, &:enabled:focus {
        background: none;
    }
`


export const ProfilePicture = styled(IonAvatar)`    
    width: 40vw;
    height: 40vw;
    aspect-ratio: 1;
    
`

export const ProfileNameWrapper = styled.div`
    text-align: center;
`

export const ProfileName = styled.h1`
    color: ${variables.primaryColorDarker};
    display: inline;
    font-size: clamp(32px, 5vw, 64px);
`

export const ProfileSubtext = styled.p`
    color: ${variables.disabledColor};
    display: inline;
    margin-left: 10px;
`

export const ProfileBio = styled.p`
    text-align: center;

`

export const ProfileStatsWrapper = styled.div`
    text-align: center;
    padding: 5% 5% 0 0;
    border: solid 2px ${variables.menuBackgroundColorDarker};
    border-radius: 16px;
`


export const ProfileMainStats = styled.table`
    margin: auto;
    width: 100%;

    & th:not(:last-child)   {
        padding: 0 10px;
        border-right: solid 2px ${variables.disabledColor};
    }

    & h3 {
        font-size: clamp(16px, 3vw, 32px);
    }

    & h6 {
        font-size: clamp(12px, 2vw, 24px);
    }
`

export const FriendsListSectionTitle = styled.h1`
    font-weight: bolder;
`

export const FriendsList = styled.div`
    display: flex;
    gap: 10px;
`

export const FriendsListItem = styled(IonAvatar)`
    display: inline;
`





