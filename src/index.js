/**
 * Принимает в себя два аргумента, один из них принимает объект, второй строку с названием
 * дескриптора. Должно вернуть массив строк, которыми являются ключи объекта соответствующие
 * дескриптору. То есть если у нас есть два свойства у которых writable true(если мы передали арг
 * writable) то возвращает массив со строками-названиями этих свойств. Смотрите пример в check.js
 * @param {Object} object
 * @param {'writable' | 'enumerable' | 'configurable'} descriptor
 *
 * @returns string[]
 */
export const getKeysByDescriptor = (object, descriptor) => {
  let propertyObj = Object.getOwnPropertyDescriptors(object);
  let keys = Object.keys(propertyObj);

  let filtered = keys.filter(function (item) {
    if (propertyObj[item][descriptor]) {
      return item;
    }
  });

  return filtered;
};

/**
 * Должен вернуть true если объект был заморожен каким-либо методом заморозки freeze, seal, preventExtensions иначе false
 * @param {Object} object
 * @returns {boolean}
 */
export const isObjectAnyFrozen = (object) => {
  return (
    !Object.isExtensible(object) ||
    Object.isSealed(object) ||
    Object.isFrozen(object)
  );
};

/**
 * Принимает объект и строку. Мы должны вернуть НОВЫЙ объект(копию оригинального), в котором
 * название свойства (мы передали вторым аргументом), будет поставлено во writable false(только
 * нельзя перезаписывать, все остальное можно). Если свойство было в объекте, то мы ставим его значение
 * если не было ставим в значение null
 * @param {Object} object
 * @param {string} propertyName
 *
 * @returns {Object}
 */
export const assignLockedValues = (object, propertyName) => {
  console.log(object);
  console.log(propertyName);

  console.log(object.propertyName);

  // let clone = Object.defineProperties({[propertyName]: object.propertyName}, Object.getOwnPropertyDescriptors(object))
  // console.log(clone)

  const clone = { ...object };
  console.log(clone);

  let descriptorObg = Object.getOwnPropertyDescriptors(clone);
  console.log(descriptorObg);

  console.log(propertyName in clone);

  if (propertyName in clone) {
    return Object.defineProperty(clone, propertyName, {
      writable: false,
    });
  } else {
    return Object.defineProperty(clone, propertyName, {
      enumerable: true,
      configurable: true,
      value: null,
    });
  }
};

/**
 * Принимает объект и возвращает его копию, только абсолютно замороженную
 * Нельзя удалять свойства, добавлять и редактировать
 * @param {Object} object
 * @returns {Object}
 */

export const freezeAllInObject = (object) => {
  let clone = Object.defineProperties(
    {},
    Object.getOwnPropertyDescriptors(object)
  );

  return Object.preventExtensions(Object.freeze(Object.seal(clone)));
};
