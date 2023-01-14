import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TopBarInfo from '../../components/layout/TopBar/TopBarInfo';

export default {
  title: 'App/Layout/TopBarInfo',
  component: TopBarInfo,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof TopBarInfo>;

const Template: ComponentStory<typeof TopBarInfo> = (args) => <TopBarInfo {...args} />;

export const LoggedIn = Template.bind({});
export const LoggedOut = Template.bind({});

