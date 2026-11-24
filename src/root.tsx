import React from 'react';
import {Composition} from 'remotion';
import {OlyaKolyaTest} from './scene';
export const Root: React.FC = () => (
  <Composition id="OlyaKolyaTest" component={OlyaKolyaTest} durationInFrames={150} fps={30} width={1080} height={1920}/>
);
