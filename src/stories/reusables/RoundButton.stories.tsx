import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RoundButton from '../../components/reusables/RoundButton';
import LeaderboardIconUrl from '../../assets/images/UI/Leaderboards.svg'

export default {
  title: 'App/Reusables/RoundButton',
  component: RoundButton,
  parameters: {
    layout: 'centered'
  }
} as ComponentMeta<typeof RoundButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RoundButton> = (args) => <RoundButton {...args} />;

export const Default = Template.bind({});
Default.args = {
    iconUrl: LeaderboardIconUrl
}

export const CustomBackground = Template.bind({});
CustomBackground.args = {
    iconUrl: LeaderboardIconUrl,
    backgroundColor: 'red',
    color: 'green'
};

export const WithText = Template.bind({});
WithText.args = {
  iconUrl: LeaderboardIconUrl,
  text: 'Test Text',
};

export const TextToTheRight = Template.bind({});
TextToTheRight.args = {
    iconUrl: LeaderboardIconUrl,
    text: 'Test Text',
    textPosition: 'right'
}
