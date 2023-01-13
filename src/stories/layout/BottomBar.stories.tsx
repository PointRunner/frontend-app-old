import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BottomBar from '../../components/layout/BottomBar/BottomBar';

export default {
  title: 'App/Layout/BottomBar',
  component: BottomBar,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof BottomBar>;

const Template: ComponentStory<typeof BottomBar> = (args) => <BottomBar {...args} />;

export const LoggedIn = Template.bind({});
export const LoggedOut = Template.bind({});

