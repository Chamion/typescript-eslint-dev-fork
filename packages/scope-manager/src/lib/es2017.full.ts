// THIS CODE WAS AUTOMATICALLY GENERATED
// DO NOT EDIT THIS CODE BY HAND
// YOU CAN REGENERATE IT USING yarn generate:lib

import { ImplicitLibVariableOptions } from '../variable';
import { es2017 } from './es2017';
import { dom } from './dom';
import { webworker_importscripts } from './webworker.importscripts';
import { scripthost } from './scripthost';
import { dom_iterable } from './dom.iterable';

export const es2017_full = {
  ...es2017,
  ...dom,
  ...webworker_importscripts,
  ...scripthost,
  ...dom_iterable,
} as Record<string, ImplicitLibVariableOptions>;
