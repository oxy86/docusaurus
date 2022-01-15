/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import logger from '@docusaurus/logger';
import Table from 'cli-table3';
import type {ThemeComponents} from './components';

const safeLabel = logger.green('safe');
const unsafeLabel = logger.red('unsafe');

export function statusTable(): string {
  const table = new Table({
    head: ['Status', 'CLI option', 'Description'],
  });

  table.push({
    [safeLabel]: [
      '',
      `
This component is safe to swizzle and was designed for this purpose.
The swizzled component is retro-compatible with minor version upgrades.
`,
    ],
  });

  table.push({
    [unsafeLabel]: [
      logger.code('--danger'),
      `
This component is unsafe to swizzle, but you can still do it!
Warning: we may release breaking changes within minor version upgrades.
You will have to upgrade your component manually and maintain it over time.

${logger.green('Tip')}: your customization can't be done in a ${safeLabel} way?
Report it here: https://github.com/facebook/docusaurus/discussions/5468
`,
    ],
  });

  return table.toString();
}

export function actionsTable(): string {
  const table = new Table({
    head: ['Actions', 'CLI option', 'Description'],
  });

  table.push({
    [logger.bold('Wrap')]: [
      logger.code('--wrap'),
      `
Creates a wrapper around the original theme component.
Allows rendering other components before/after the original theme component.

${logger.green('Tip')}: prefer ${logger.code(
        '--wrap',
      )} whenever possible to reduces the amount of code to maintain.
      `,
    ],
  });

  table.push({
    [logger.bold('Eject')]: [
      logger.code('--eject'),
      `
Ejects the full source code of the original theme component.
Allows overriding the original component entirely with your own UI and logic.

${logger.green('Tip')}: ${logger.code(
        '--eject',
      )} can be useful to completely redesign a component.
`,
    ],
  });

  return table.toString();
}

export function themeComponentsTable(themeComponents: ThemeComponents): string {
  const table = new Table({
    head: ['Component name', 'Eject', 'Wrap', 'Description'],
  });

  themeComponents.all.forEach((component) => {
    table.push({
      [component]: [
        themeComponents.isSafe(component) ? safeLabel : unsafeLabel,
        themeComponents.isSafe(component) ? safeLabel : unsafeLabel, // TODO
        'Lorem Ipsum', // TODO
      ],
    });
  });

  return `Components available for swizzle in ${logger.name(
    themeComponents.themeName,
  )}:
${table.toString()}`;
}