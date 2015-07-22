function isPlainObject(o) {
  return o!==null && 'object' === typeof o;
}

function isCollection(o) {
  return Array.isArray(o) || isPlainObject(o);
}

function filter(value, fn, pkey) {
  if (Array.isArray(value)) return filterArray(value, fn, pkey);
  else if (isPlainObject(value)) return filterObject(value, fn, pkey);
  return value;
}

function filterObject(obj, fn, pkey) {
  var newObj = {};
  var key;
  var value;

  for (key in obj) {
    value = filter(obj[key], fn, key);
    if (fn.call(obj, value, key, obj, pkey)) {
      if (value !== obj[key] && !isCollection(value)) value = obj[key];
      newObj[key] = value;
    }
  }

  return newObj;
}

function filterArray(array, fn, pkey) {
  var filtered = [];

  array.forEach(function (value, index, array) {
    value = filter(value, fn, index);
    if (fn.call(array, value, index, array, pkey)) {
      if (value !== array[index] && !isCollection(value)) value = array[index];
      filtered.push(value);
    }
  });

  return filtered;
}

module.exports = filter;