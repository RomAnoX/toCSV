const configuration = require('../src/configuration');

test ('Create configuration', () => {
  const config = configuration({});
  expect(config.name).toBeDefined();
  expect(config.value).toBeDefined();
  expect(config.hide).toBeDefined();
  expect(config.only).toBeDefined();
  expect(config.ignore).toBeDefined();
  expect(config.ignoreOnEmpty).toBeDefined();
  expect(config.transform).toBeUndefined();
});

test ('Name method', () => {
  const config = configuration({
    'empty': {},
    'root': 'Root Element',
    'test': { name: 'First Object' },
  });
  expect(config.name('empty')).toBe('empty');
  expect(config.name('root')).toBe('Root Element');
  expect(config.name('test')).toBe('First Object');
  expect(config.name('test.notExisting')).toBe('notExisting');
  expect(config.name('test.deep.object.element')).toBe('element');
});

test ('Value method', () => {
  const config = configuration({
    'empty': {},
    'root': 'Root Element',
    'test': { transform: v => v.toLowerCase() },
    'foo': { transform: 'not a function' }
  });
  expect(config.value('not.existing.key', true)).toBe(true);
  expect(config.value('empty', 'EMPTY')).toBe('EMPTY');
  expect(config.value('root', 345)).toBe(345);
  expect(config.value('test', 'VALUE')).toBe('value');
  expect(config.value('foo', 'VALUE')).toBe('VALUE');
});

test ('Ignore method', () => {
  const config = configuration({
    'empty': {},
    'root': 'Root Element',
    'test': { ignore: true },
  });
  expect(config.ignore('test')).toBe(true);
  expect(config.ignore('root')).toBe(false);
  expect(config.ignore('empty')).toBe(false);
  expect(config.ignore('not.existing.key')).toBe(false);
});

test ('Hide method', () => {
  const config = configuration({
    'empty': {},
    'root': 'Root Element',
    'test': { hide: true },
  });
  expect(config.hide('test')).toBe(true);
  expect(config.hide('root')).toBe(false);
  expect(config.hide('empty')).toBe(false);
  expect(config.hide('not.existing.key')).toBe(false);
});

test ('Ignore on empty method', () => {
  const config = configuration({
    'empty': {},
    'root': 'Root Element',
    'test': { ignoreOnEmpty: true },
  });
  expect(config.ignoreOnEmpty('empty')).toBe(false);
  expect(config.ignoreOnEmpty('root')).toBe(false);
  expect(config.ignoreOnEmpty('test')).toBe(true);
  expect(config.ignoreOnEmpty('not.existing.key')).toBe(false);
});

test ('Only method', () => {
  const config = configuration({
    'empty': {},
    'root': 'Root Element',
    'test': { only: ['foo', 'bar'] },
    'foo': { only: 'baz' }
  });
  expect(config.only('empty')).toBeNull();
  expect(config.only('root')).toBeNull();
  expect(config.only('test')).toEqual(['foo', 'bar']);
  expect(config.only('foo')).toEqual(['baz']);
});
