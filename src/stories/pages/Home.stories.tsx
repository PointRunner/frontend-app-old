import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Home from '../../pages/Home';

export default {
  title: 'App/Home',
  component: Home,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />;

export const LoggedOut = Template.bind({});

export const LoggedIn = Template.bind({});
