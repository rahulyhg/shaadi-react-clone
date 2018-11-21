import { configure } from '@storybook/react';
import 'typeface-roboto';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("../src/stories/", true, /Story\.js?$/));
}

configure(loadStories, module);
