/**
 * objectWithoutKey - returns a new object, excluding the key property supplied
 * @param  {[object]} object [description]
 * @param  {[key]} key    [description]
 * @return {[object]}        [description]
 */
const objectWithoutKey = (object, key) => {
  const { [key]: deletedKey, ...otherKeys } = object;
  return otherKeys;
};

module.exports = { objectWithoutKey };
