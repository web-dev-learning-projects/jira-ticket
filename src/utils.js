import ShortUniqueId from 'short-unique-id';

const idGenerator = new ShortUniqueId({ length: 5 });

export function uid() {
    return idGenerator.rnd();
}
