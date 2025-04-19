import * as migration_20250415_130304_initial from './20250415_130304_initial';

export const migrations = [
  {
    up: migration_20250415_130304_initial.up,
    down: migration_20250415_130304_initial.down,
    name: '20250415_130304_initial'
  },
];
