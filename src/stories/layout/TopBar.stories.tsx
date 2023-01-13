import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TopBar from '../../components/layout/TopBar/TopBar';

export default {
  title: 'App/Layout/TopBar',
  component: TopBar,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof TopBar>;

const Template: ComponentStory<typeof TopBar> = (args) => <TopBar {...args} />;

export const LoggedIn = Template.bind({});
export const LoggedOut = Template.bind({});

