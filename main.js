const rebuildImplementations = {
    'at': `Array.prototype.at2 = function(index) {
    const length = this.length;
    
    if (index < 0) {
        index = length + index;
    }
    
    if (index < 0 || index >= length) {
        return undefined;
    }
    
    return this[index];
};`,

    'concat': `Array.prototype.concat2 = function(...args) {
    const result = [];
    
    for (let i = 0; i < this.length; i++) {
        result[result.length] = this[i];
    }
    
    for (const arg of args) {
        if (Array.isArray(arg)) {
            for (let i = 0; i < arg.length; i++) {
                result[result.length] = arg[i];
            }
        } else {
            result[result.length] = arg;
        }
    }
    
    return result;
};`,

    'copyWithin': `Array.prototype.copyWithin2 = function(target, start = 0, end = this.length) {
    const length = this.length;
    
    const normalizedTarget = target < 0 ? Math.max(length + target, 0) : Math.min(target, length);
    const normalizedStart = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);
    const normalizedEnd = end < 0 ? Math.max(length + end, 0) : Math.min(end, length);
    
    const count = Math.min(normalizedEnd - normalizedStart, length - normalizedTarget);
    
    if (count > 0) {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp[i] = this[normalizedStart + i];
        }
        for (let i = 0; i < count; i++) {
            this[normalizedTarget + i] = temp[i];
        }
    }
    
    return this;
};`,

    'entries': `Array.prototype.entries2 = function() {
    const arr = this;
    let index = 0;
    
    return {
        [Symbol.iterator]() { return this; },
        next() {
            if (index < arr.length) {
                return { value: [index, arr[index++]], done: false };
            }
            return { done: true };
        }
    };
};`,

    'every': `Array.prototype.every2 = function(callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    
    const length = this.length;
    
    for (let i = 0; i < length; i++) {
        if (i in this) {
            if (!callback.call(thisArg, this[i], i, this)) {
                return false;
            }
        }
    }
    
    return true;
};`,

    'fill': `Array.prototype.fill2 = function(value, start = 0, end = this.length) {
    const length = this.length;
    
    const normalizedStart = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);
    const normalizedEnd = end < 0 ? Math.max(length + end, 0) : Math.min(end, length);
    
    for (let i = normalizedStart; i < normalizedEnd; i++) {
        this[i] = value;
    }
    
    return this;
};`,

    'filter': `Array.prototype.filter2 = function(callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    
    const result = [];
    const length = this.length;
    
    for (let i = 0; i < length; i++) {
        if (i in this) {
            if (callback.call(thisArg, this[i], i, this)) {
                result[result.length] = this[i];
            }
        }
    }
    
    return result;
};`,

    'find': `Array.prototype.find2 = function(callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    
    const length = this.length;
    
    for (let i = 0; i < length; i++) {
        if (i in this) {
            if (callback.call(thisArg, this[i], i, this)) {
                return this[i];
            }
        }
    }
    
    return undefined;
};`,

    'findIndex': `Array.prototype.findIndex2 = function(callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    
    const length = this.length;
    
    for (let i = 0; i < length; i++) {
        if (i in this) {
            if (callback.call(thisArg, this[i], i, this)) {
                return i;
            }
        }
    }
    
    return -1;
};`,

    'findLast': `Array.prototype.findLast2 = function(callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    
    const length = this.length;
    
    for (let i = length - 1; i >= 0; i--) {
        if (i in this) {
            if (callback.call(thisArg, this[i], i, this)) {
                return this[i];
            }
        }
    }
    
    return undefined;
};`,

    'findLastIndex': `Array.prototype.findLastIndex2 = function(callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    
    const length = this.length;
    
    for (let i = length - 1; i >= 0; i--) {
        if (i in this) {
            if (callback.call(thisArg, this[i], i, this)) {
                return i;
            }
        }
    }
    
    return -1;
};`,

    'flat': `Array.prototype.flat2 = function(depth = 1) {
    const flatten = (arr, currentDepth) => {
        const result = [];
        
        for (let i = 0; i < arr.length; i++) {
            if (i in arr) {
                if (Array.isArray(arr[i]) && currentDepth > 0) {
                    result.push(...flatten(arr[i], currentDepth - 1));
                } else {
                    result.push(arr[i]);
                }
            }
        }
        
        return result;
    };
    
    return flatten(this, depth === Infinity ? Number.MAX_SAFE_INTEGER : depth);
};`,

    'flatMap': `Array.prototype.flatMap2 = function(callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    
    const result = [];
    const length = this.length;
    
    for (let i = 0; i < length; i++) {
        if (i in this) {
            const mapped = callback.call(thisArg, this[i], i, this);
            if (Array.isArray(mapped)) {
                result.push(...mapped);
            } else {
                result.push(mapped);
            }
        }
    }
    
    return result;
};`,

    'forEach': `Array.prototype.forEach2 = function(callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    
    const length = this.length;
    
    for (let i = 0; i < length; i++) {
        if (i in this) {
            callback.call(thisArg, this[i], i, this);
        }
    }
};`,

    'includes': `Array.prototype.includes2 = function(searchElement, fromIndex = 0) {
    const length = this.length;
    
    let start = fromIndex < 0 ? Math.max(length + fromIndex, 0) : fromIndex;
    
    for (let i = start; i < length; i++) {
        if (this[i] === searchElement || (Number.isNaN(this[i]) && Number.isNaN(searchElement))) {
            return true;
        }
    }
    
    return false;
};`,

    'indexOf': `Array.prototype.indexOf2 = function(searchElement, fromIndex = 0) {
    const length = this.length;
    
    let start = fromIndex < 0 ? Math.max(length + fromIndex, 0) : fromIndex;
    
    for (let i = start; i < length; i++) {
        if (i in this && this[i] === searchElement) {
            return i;
        }
    }
    
    return -1;
};`,

    'join': `Array.prototype.join2 = function(separator = ',') {
    if (this.length === 0) return '';
    
    let result = '';
    
    for (let i = 0; i < this.length; i++) {
        if (i > 0) {
            result += separator;
        }
        
        if (this[i] !== null && this[i] !== undefined) {
            result += String(this[i]);
        }
    }
    
    return result;
};`,

    'keys': `Array.prototype.keys2 = function() {
    const arr = this;
    let index = 0;
    
    return {
        [Symbol.iterator]() { return this; },
        next() {
            if (index < arr.length) {
                return { value: index++, done: false };
            }
            return { done: true };
        }
    };
};`,

    'lastIndexOf': `Array.prototype.lastIndexOf2 = function(searchElement, fromIndex = this.length - 1) {
    const length = this.length;
    
    let start = fromIndex < 0 ? length + fromIndex : Math.min(fromIndex, length - 1);
    
    for (let i = start; i >= 0; i--) {
        if (i in this && this[i] === searchElement) {
            return i;
        }
    }
    
    return -1;
};`,

    'map': `Array.prototype.map2 = function(callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    
    const result = new Array(this.length);
    const length = this.length;
    
    for (let i = 0; i < length; i++) {
        if (i in this) {
            result[i] = callback.call(thisArg, this[i], i, this);
        }
    }
    
    return result;
};`,

    'pop': `Array.prototype.pop2 = function() {
    const length = this.length;
    
    if (length === 0) {
        return undefined;
    }
    
    const element = this[length - 1];
    delete this[length - 1];
    this.length = length - 1;
    
    return element;
};`,

    'push': `Array.prototype.push2 = function(...elements) {
    let length = this.length;
    
    for (let i = 0; i < elements.length; i++) {
        this[length + i] = elements[i];
    }
    
    this.length = length + elements.length;
    return this.length;
};`,

    'reduce': `Array.prototype.reduce2 = function(callback, initialValue) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    
    const length = this.length;
    let accumulator;
    let startIndex;
    
    if (arguments.length >= 2) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        if (length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        
        for (let i = 0; i < length; i++) {
            if (i in this) {
                accumulator = this[i];
                startIndex = i + 1;
                break;
            }
        }
        
        if (startIndex === undefined) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
    }
    
    for (let i = startIndex; i < length; i++) {
        if (i in this) {
            accumulator = callback(accumulator, this[i], i, this);
        }
    }
    
    return accumulator;
};`,

    'reduceRight': `Array.prototype.reduceRight2 = function(callback, initialValue) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    
    const length = this.length;
    let accumulator;
    let startIndex;
    
    if (arguments.length >= 2) {
        accumulator = initialValue;
        startIndex = length - 1;
    } else {
        if (length === 0) {
            throw new TypeError('ReduceRight of empty array with no initial value');
        }
        
        for (let i = length - 1; i >= 0; i--) {
            if (i in this) {
                accumulator = this[i];
                startIndex = i - 1;
                break;
            }
        }
        
        if (startIndex === undefined) {
            throw new TypeError('ReduceRight of empty array with no initial value');
        }
    }
    
    for (let i = startIndex; i >= 0; i--) {
        if (i in this) {
            accumulator = callback(accumulator, this[i], i, this);
        }
    }
    
    return accumulator;
};`,

    'reverse': `Array.prototype.reverse2 = function() {
    const length = this.length;
    
    for (let i = 0; i < Math.floor(length / 2); i++) {
        const temp = this[i];
        this[i] = this[length - 1 - i];
        this[length - 1 - i] = temp;
    }
    
    return this;
};`,

    'shift': `Array.prototype.shift2 = function() {
    const length = this.length;
    
    if (length === 0) {
        return undefined;
    }
    
    const firstElement = this[0];
    
    for (let i = 1; i < length; i++) {
        this[i - 1] = this[i];
    }
    
    delete this[length - 1];
    this.length = length - 1;
    
    return firstElement;
};`,

    'slice': `Array.prototype.slice2 = function(start = 0, end = this.length) {
    const length = this.length;
    
    const normalizedStart = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);
    const normalizedEnd = end < 0 ? Math.max(length + end, 0) : Math.min(end, length);
    
    const result = [];
    
    for (let i = normalizedStart; i < normalizedEnd; i++) {
        if (i in this) {
            result[result.length] = this[i];
        }
    }
    
    return result;
};`,

    'some': `Array.prototype.some2 = function(callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    
    const length = this.length;
    
    for (let i = 0; i < length; i++) {
        if (i in this) {
            if (callback.call(thisArg, this[i], i, this)) {
                return true;
            }
        }
    }
    
    return false;
};`,

    'sort': `Array.prototype.sort2 = function(compareFunction) {
    const length = this.length;
    
    if (length <= 1) return this;
    
    const compare = compareFunction || ((a, b) => {
        const aString = String(a);
        const bString = String(b);
        if (aString < bString) return -1;
        if (aString > bString) return 1;
        return 0;
    });
    
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (compare(this[j], this[j + 1]) > 0) {
                const temp = this[j];
                this[j] = this[j + 1];
                this[j + 1] = temp;
            }
        }
    }
    
    return this;
};`,

    'splice': `Array.prototype.splice2 = function(start, deleteCount = this.length - start, ...items) {
    const length = this.length;
    const actualStart = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);
    const actualDeleteCount = Math.max(0, Math.min(deleteCount, length - actualStart));
    
    const deletedElements = [];
    
    for (let i = 0; i < actualDeleteCount; i++) {
        deletedElements[i] = this[actualStart + i];
    }
    
    const itemCount = items.length;
    const delta = itemCount - actualDeleteCount;
    
    if (delta > 0) {
        for (let i = length - 1; i >= actualStart + actualDeleteCount; i--) {
            this[i + delta] = this[i];
        }
    } else if (delta < 0) {
        for (let i = actualStart + actualDeleteCount; i < length; i++) {
            this[i + delta] = this[i];
        }
    }
    
    for (let i = 0; i < itemCount; i++) {
        this[actualStart + i] = items[i];
    }
    
    this.length = length + delta;
    
    return deletedElements;
};`,

    'toReversed': `Array.prototype.toReversed2 = function() {
    const result = [];
    
    for (let i = this.length - 1; i >= 0; i--) {
        if (i in this) {
            result[result.length] = this[i];
        }
    }
    
    return result;
};`,

    'toSorted': `Array.prototype.toSorted2 = function(compareFunction) {
    const result = [];
    
    for (let i = 0; i < this.length; i++) {
        if (i in this) {
            result[i] = this[i];
        }
    }
    
    return result.sort2 ? result.sort2(compareFunction) : result.sort(compareFunction);
};`,

    'toSpliced': `Array.prototype.toSpliced2 = function(start, deleteCount = this.length - start, ...items) {
    const result = [];
    
    for (let i = 0; i < this.length; i++) {
        if (i in this) {
            result[i] = this[i];
        }
    }
    
    result.splice2 ? result.splice2(start, deleteCount, ...items) : result.splice(start, deleteCount, ...items);
    
    return result;
};`,

    'unshift': `Array.prototype.unshift2 = function(...elements) {
    const elementsLength = elements.length;
    const currentLength = this.length;
    
    for (let i = currentLength - 1; i >= 0; i--) {
        this[i + elementsLength] = this[i];
    }
    
    for (let i = 0; i < elementsLength; i++) {
        this[i] = elements[i];
    }
    
    this.length = currentLength + elementsLength;
    return this.length;
};`,

    'values': `Array.prototype.values2 = function() {
    const arr = this;
    let index = 0;
    
    return {
        [Symbol.iterator]() { return this; },
        next() {
            if (index < arr.length) {
                return { value: arr[index++], done: false };
            }
            return { done: true };
        }
    };
};`,

    'with': `Array.prototype.with2 = function(index, value) {
    const length = this.length;
    const normalizedIndex = index < 0 ? length + index : index;
    
    if (normalizedIndex < 0 || normalizedIndex >= length) {
        throw new RangeError('Invalid index');
    }
    
    const result = [];
    
    for (let i = 0; i < length; i++) {
        if (i in this) {
            result[i] = i === normalizedIndex ? value : this[i];
        }
    }
    
    return result;
};`
};

const arrayMethodsData = [
    {
        methodName: 'at()',
        methodDescription: 'Trả về phần tử tại vị trí cho trước (hỗ trợ số âm)',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const numbersArray = [1, 2, 3, 4, 5];
const result = numbersArray.at(2);`,
                result: '3'
            },
            complex: {
                title: 'Test Case Phức Tạp', 
                code: `const complexArray = ['a', 'b', 'c', 'd'];
const result = complexArray.at(-1);`,
                result: 'd'
            },
            edge: {
                title: 'Edge Case',
                code: `const emptyArray = [];
const result = emptyArray.at(0);`,
                result: 'undefined'
            }
        }
    },
    {
        methodName: 'concat()',
        methodDescription: 'Kết hợp các mảng hoặc giá trị thành mảng mới',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const firstArray = [1, 2];
const secondArray = [3, 4];
const result = firstArray.concat(secondArray);`,
                result: '[1, 2, 3, 4]'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const mainArray = ['a', 'b'];
const result = mainArray.concat(['c'], 'd', [['e']]);`,
                result: "['a', 'b', 'c', 'd', ['e']]"
            },
            edge: {
                title: 'Edge Case',
                code: `const nullArray = null;
const result = [].concat(nullArray);`,
                result: '[null]'
            }
        }
    },
    {
        methodName: 'copyWithin()',
        methodDescription: 'Sao chép một phần của mảng sang vị trí khác trong cùng mảng',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const array = [1, 2, 3, 4, 5];
array.copyWithin(0, 3, 4);`,
                result: '[4, 2, 3, 4, 5]'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const complexArray = ['a', 'b', 'c', 'd', 'e'];
complexArray.copyWithin(2, 0, 2);`,
                result: "['a', 'b', 'a', 'b', 'e']"
            },
            edge: {
                title: 'Edge Case',
                code: `const negativeArray = [1, 2, 3, 4];
negativeArray.copyWithin(-2, -4, -3);`,
                result: '[1, 2, 1, 4]'
            }
        }
    },
    {
        methodName: 'entries()',
        methodDescription: 'Trả về iterator với cặp [index, value] cho mỗi phần tử',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const entriesArray = ['a', 'b', 'c'];
const result = [...entriesArray.entries()];`,
                result: '[[0, "a"], [1, "b"], [2, "c"]]'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const mixedEntries = [1, 'hello', true];
for (const [index, value] of mixedEntries.entries()) {
  console.log(\`\${index}: \${value}\`);
}`,
                result: '"0: 1", "1: hello", "2: true"'
            },
            edge: {
                title: 'Edge Case',
                code: `const sparseEntries = [1, , 3];
const result = [...sparseEntries.entries()];`,
                result: '[[0, 1], [1, undefined], [2, 3]]'
            }
        }
    },
    {
        methodName: 'every()',
        methodDescription: 'Kiểm tra xem tất cả phần tử có thỏa mãn điều kiện',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const positiveNumbers = [1, 2, 3, 4, 5];
const result = positiveNumbers.every(num => num > 0);`,
                result: 'true'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const userAges = [25, 30, 35, 40];
const result = userAges.every(age => age >= 18);`,
                result: 'true'
            },
            edge: {
                title: 'Edge Case',
                code: `const emptyArray = [];
const result = emptyArray.every(item => item > 0);`,
                result: 'true'
            }
        }
    },
    {
        methodName: 'fill()',
        methodDescription: 'Điền tất cả phần tử với một giá trị cố định',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const fillArray = [1, 2, 3, 4];
fillArray.fill(0);`,
                result: '[0, 0, 0, 0]'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const rangeFill = [1, 2, 3, 4, 5];
rangeFill.fill('x', 1, 4);`,
                result: "[1, 'x', 'x', 'x', 5]"
            },
            edge: {
                title: 'Edge Case',
                code: `const objectFill = new Array(3).fill({name: 'test'});
objectFill[0].name = 'changed';`,
                result: '[{name: "changed"}, {name: "changed"}, {name: "changed"}]'
            }
        }
    },
    {
        methodName: 'filter()',
        methodDescription: 'Tạo mảng mới với các phần tử thỏa mãn điều kiện',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const numbersList = [1, 2, 3, 4, 5];
const result = numbersList.filter(num => num % 2 === 0);`,
                result: '[2, 4]'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const userObjects = [{age: 25}, {age: 17}, {age: 30}];
const result = userObjects.filter(user => user.age >= 18);`,
                result: '[{age: 25}, {age: 30}]'
            },
            edge: {
                title: 'Edge Case',
                code: `const undefinedArray = [undefined, null, 0, '', false];
const result = undefinedArray.filter(Boolean);`,
                result: '[]'
            }
        }
    },
    {
        methodName: 'find()',
        methodDescription: 'Trả về phần tử đầu tiên thỏa mãn điều kiện',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const scoresArray = [85, 92, 78, 96, 88];
const result = scoresArray.find(score => score > 90);`,
                result: '92'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const productsList = [{id: 1, name: 'Laptop'}, {id: 2, name: 'Phone'}];
const result = productsList.find(product => product.name === 'Phone');`,
                result: '{id: 2, name: "Phone"}'
            },
            edge: {
                title: 'Edge Case',
                code: `const emptySearchArray = [];
const result = emptySearchArray.find(item => item > 0);`,
                result: 'undefined'
            }
        }
    },
    {
        methodName: 'findIndex()',
        methodDescription: 'Trả về chỉ số của phần tử đầu tiên thỏa mãn điều kiện',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const findIndexArray = [5, 12, 8, 130, 44];
const result = findIndexArray.findIndex(element => element > 13);`,
                result: '3'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const users = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}];
const result = users.findIndex(user => user.name === 'Jane');`,
                result: '1'
            },
            edge: {
                title: 'Edge Case',
                code: `const notFoundIndex = [1, 2, 3];
const result = notFoundIndex.findIndex(x => x > 10);`,
                result: '-1'
            }
        }
    },
    {
        methodName: 'findLast()',
        methodDescription: 'Trả về phần tử cuối cùng thỏa mãn điều kiện',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const findLastArray = [1, 2, 3, 4, 5, 4, 3, 2, 1];
const result = findLastArray.findLast(x => x % 2 === 0);`,
                result: '2'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const products = [{id: 1, price: 100}, {id: 2, price: 200}, {id: 3, price: 150}];
const result = products.findLast(p => p.price > 120);`,
                result: '{id: 3, price: 150}'
            },
            edge: {
                title: 'Edge Case',
                code: `const emptyFindLast = [];
const result = emptyFindLast.findLast(x => x > 0);`,
                result: 'undefined'
            }
        }
    },
    {
        methodName: 'findLastIndex()',
        methodDescription: 'Trả về chỉ số của phần tử cuối cùng thỏa mãn điều kiện',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const findLastIndexArray = [1, 2, 3, 4, 5, 4, 3, 2, 1];
const result = findLastIndexArray.findLastIndex(x => x % 2 === 0);`,
                result: '7'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const scores = [85, 92, 78, 96, 88, 94];
const result = scores.findLastIndex(score => score > 90);`,
                result: '5'
            },
            edge: {
                title: 'Edge Case',
                code: `const noMatchArray = [1, 3, 5];
const result = noMatchArray.findLastIndex(x => x % 2 === 0);`,
                result: '-1'
            }
        }
    },
    {
        methodName: 'flat()',
        methodDescription: 'Làm phẳng mảng lồng nhau thành mảng một chiều',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const nestedArray = [1, [2, 3], [4, 5]];
const result = nestedArray.flat();`,
                result: '[1, 2, 3, 4, 5]'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const deepNested = [1, [2, [3, [4, 5]]]];
const result = deepNested.flat(3);`,
                result: '[1, 2, 3, 4, 5]'
            },
            edge: {
                title: 'Edge Case',
                code: `const sparseFlat = [1, , [3, , 5]];
const result = sparseFlat.flat();`,
                result: '[1, 3, undefined, 5]'
            }
        }
    },
    {
        methodName: 'flatMap()',
        methodDescription: 'Map rồi flat kết quả thành mảng một chiều',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const flatMapArray = [1, 2, 3];
const result = flatMapArray.flatMap(x => [x, x * 2]);`,
                result: '[1, 2, 2, 4, 3, 6]'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const sentences = ["Hello world", "How are you"];
const result = sentences.flatMap(sentence => sentence.split(' '));`,
                result: '["Hello", "world", "How", "are", "you"]'
            },
            edge: {
                title: 'Edge Case',
                code: `const conditionalFlat = [1, 2, 3, 4];
const result = conditionalFlat.flatMap(x => x % 2 === 0 ? [x] : []);`,
                result: '[2, 4]'
            }
        }
    },
    {
        methodName: 'forEach()',
        methodDescription: 'Thực hiện hàm cho từng phần tử (không trả về)',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const itemsList = ['apple', 'banana', 'cherry'];
let resultString = '';
itemsList.forEach(item => resultString += item + ' ');`,
                result: '"apple banana cherry "'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const numbersData = [1, 2, 3];
const processedResults = [];
numbersData.forEach((num, index) => processedResults.push({num, index}));`,
                result: '[{num: 1, index: 0}, {num: 2, index: 1}, {num: 3, index: 2}]'
            },
            edge: {
                title: 'Edge Case',
                code: `const undefinedElements = [undefined, null];
let executionCount = 0;
undefinedElements.forEach(() => executionCount++);`,
                result: 'executionCount: 2'
            }
        }
    },
    {
        methodName: 'includes()',
        methodDescription: 'Kiểm tra xem mảng có chứa phần tử nào đó',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const fruitsList = ['apple', 'banana', 'orange'];
const result = fruitsList.includes('banana');`,
                result: 'true'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const numbersWithNaN = [1, 2, NaN, 4];
const result = numbersWithNaN.includes(NaN);`,
                result: 'true'
            },
            edge: {
                title: 'Edge Case',
                code: `const undefinedIncludesArray = [null, undefined];
const result = undefinedIncludesArray.includes(undefined);`,
                result: 'true'
            }
        }
    },
    {
        methodName: 'indexOf()',
        methodDescription: 'Trả về chỉ số đầu tiên của phần tử',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const colorsArray = ['red', 'blue', 'green', 'blue'];
const result = colorsArray.indexOf('blue');`,
                result: '1'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const searchArray = ['a', 'b', 'c', 'b'];
const result = searchArray.indexOf('b', 2);`,
                result: '3'
            },
            edge: {
                title: 'Edge Case',
                code: `const notFoundArray = [1, 2, 3];
const result = notFoundArray.indexOf('missing');`,
                result: '-1'
            }
        }
    },
    {
        methodName: 'join()',
        methodDescription: 'Nối tất cả phần tử thành một chuỗi',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const joinArray = ['Hello', 'world', 'from', 'JavaScript'];
const result = joinArray.join(' ');`,
                result: '"Hello world from JavaScript"'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const csvData = ['John', 'Doe', '25', 'Engineer'];
const result = csvData.join(',');`,
                result: '"John,Doe,25,Engineer"'
            },
            edge: {
                title: 'Edge Case',
                code: `const undefinedJoin = [1, undefined, null, 4];
const result = undefinedJoin.join('-');`,
                result: '"1--4"'
            }
        }
    },
    {
        methodName: 'keys()',
        methodDescription: 'Trả về iterator với các chỉ số của mảng',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const keysArray = ['a', 'b', 'c'];
const result = [...keysArray.keys()];`,
                result: '[0, 1, 2]'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const sparseKeys = [1, , 3, , 5];
const result = [...sparseKeys.keys()];`,
                result: '[0, 1, 2, 3, 4]'
            },
            edge: {
                title: 'Edge Case',
                code: `const emptyKeys = [];
const result = [...emptyKeys.keys()];`,
                result: '[]'
            }
        }
    },
    {
        methodName: 'lastIndexOf()',
        methodDescription: 'Trả về chỉ số cuối cùng của phần tử',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const lastIndexArray = [1, 2, 3, 2, 1];
const result = lastIndexArray.lastIndexOf(2);`,
                result: '3'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const searchFromArray = [1, 2, 3, 2, 1];
const result = searchFromArray.lastIndexOf(2, 2);`,
                result: '1'
            },
            edge: {
                title: 'Edge Case',
                code: `const notFoundLast = ['a', 'b', 'c'];
const result = notFoundLast.lastIndexOf('d');`,
                result: '-1'
            }
        }
    },
    {
        methodName: 'map()',
        methodDescription: 'Tạo mảng mới bằng cách biến đổi từng phần tử',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const originalNumbers = [1, 2, 3, 4];
const result = originalNumbers.map(num => num * 2);`,
                result: '[2, 4, 6, 8]'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const studentNames = ['john', 'jane', 'bob'];
const result = studentNames.map(name => name.charAt(0).toUpperCase() + name.slice(1));`,
                result: "['John', 'Jane', 'Bob']"
            },
            edge: {
                title: 'Edge Case',
                code: `const sparseArray = [1, , 3, , 5];
const result = sparseArray.map(x => x * 2);`,
                result: '[2, empty, 6, empty, 10]'
            }
        }
    },
    {
        methodName: 'pop()',
        methodDescription: 'Xóa và trả về phần tử cuối cùng',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const popArray = [1, 2, 3, 4, 5];
const result = popArray.pop();`,
                result: '5 (mảng còn lại: [1, 2, 3, 4])'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const stackArray = ['first', 'second', 'third'];
const results = [];
while(stackArray.length > 0) {
  results.push(stackArray.pop());
}`,
                result: '["third", "second", "first"]'
            },
            edge: {
                title: 'Edge Case',
                code: `const emptyPop = [];
const result = emptyPop.pop();`,
                result: 'undefined'
            }
        }
    },
    {
        methodName: 'push()',
        methodDescription: 'Thêm một hoặc nhiều phần tử vào cuối mảng',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const pushArray = [1, 2, 3];
const result = pushArray.push(4, 5);`,
                result: '5 (độ dài mới)'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const dynamicArray = [];
for(let i = 1; i <= 3; i++) {
  dynamicArray.push(\`item\${i}\`);
}`,
                result: '["item1", "item2", "item3"]'
            },
            edge: {
                title: 'Edge Case',
                code: `const pushUndefined = [1, 2];
pushUndefined.push(undefined, null);`,
                result: '[1, 2, undefined, null]'
            }
        }
    },
    {
        methodName: 'reduce()',
        methodDescription: 'Gộp tất cả phần tử thành một giá trị',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const numbersToSum = [1, 2, 3, 4, 5];
const result = numbersToSum.reduce((acc, curr) => acc + curr, 0);`,
                result: '15'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const wordsList = ['Hello', 'World', 'From', 'JavaScript'];
const result = wordsList.reduce((acc, word) => acc + ' ' + word);`,
                result: '"Hello World From JavaScript"'
            },
            edge: {
                title: 'Edge Case',
                code: `const emptyReduceArray = [];
const result = emptyReduceArray.reduce((acc, curr) => acc + curr, 'default');`,
                result: '"default"'
            }
        }
    },
    {
        methodName: 'reduceRight()',
        methodDescription: 'Reduce từ phải sang trái',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const rightArray = [1, 2, 3, 4];
const result = rightArray.reduceRight((acc, curr) => acc + curr);`,
                result: '10'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const stringArray = ['a', 'b', 'c', 'd'];
const result = stringArray.reduceRight((acc, curr) => acc + curr);`,
                result: '"dcba"'
            },
            edge: {
                title: 'Edge Case',
                code: `const singleRight = [42];
const result = singleRight.reduceRight((acc, curr) => acc + curr);`,
                result: '42'
            }
        }
    },
    {
        methodName: 'reverse()',
        methodDescription: 'Đảo ngược thứ tự các phần tử trong mảng',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const reverseArray = [1, 2, 3, 4, 5];
reverseArray.reverse();`,
                result: '[5, 4, 3, 2, 1]'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const mixedReverse = ['first', 42, true, null];
mixedReverse.reverse();`,
                result: '[null, true, 42, "first"]'
            },
            edge: {
                title: 'Edge Case',
                code: `const sparseReverse = [1, , 3, , 5];
sparseReverse.reverse();`,
                result: '[5, undefined, 3, undefined, 1]'
            }
        }
    },
    {
        methodName: 'shift()',
        methodDescription: 'Xóa và trả về phần tử đầu tiên',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const shiftArray = [1, 2, 3, 4, 5];
const result = shiftArray.shift();`,
                result: '1 (mảng còn lại: [2, 3, 4, 5])'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const queueArray = ['first', 'second', 'third'];
const results = [];
while(queueArray.length > 0) {
  results.push(queueArray.shift());
}`,
                result: '["first", "second", "third"]'
            },
            edge: {
                title: 'Edge Case',
                code: `const emptyShift = [];
const result = emptyShift.shift();`,
                result: 'undefined'
            }
        }
    },
    {
        methodName: 'slice()',
        methodDescription: 'Trả về bản sao của một phần mảng',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const sliceArray = [1, 2, 3, 4, 5];
const result = sliceArray.slice(1, 4);`,
                result: '[2, 3, 4]'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const negativeSlice = ['a', 'b', 'c', 'd', 'e'];
const result = negativeSlice.slice(-3, -1);`,
                result: '["c", "d"]'
            },
            edge: {
                title: 'Edge Case',
                code: `const fullSlice = [1, 2, 3];
const result = fullSlice.slice();`,
                result: '[1, 2, 3]'
            }
        }
    },
    {
        methodName: 'some()',
        methodDescription: 'Kiểm tra xem có ít nhất một phần tử thỏa mãn điều kiện',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const agesList = [16, 18, 20, 22];
const result = agesList.some(age => age >= 18);`,
                result: 'true'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const mixedTypes = [1, 'hello', true, null];
const result = mixedTypes.some(item => typeof item === 'string');`,
                result: 'true'
            },
            edge: {
                title: 'Edge Case',
                code: `const emptyCheckArray = [];
const result = emptyCheckArray.some(item => item > 0);`,
                result: 'false'
            }
        }
    },
    {
        methodName: 'sort()',
        methodDescription: 'Sắp xếp các phần tử trong mảng',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const sortArray = [3, 1, 4, 1, 5];
sortArray.sort();`,
                result: '[1, 1, 3, 4, 5]'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const numberSort = [10, 5, 40, 25, 1000, 1];
numberSort.sort((a, b) => a - b);`,
                result: '[1, 5, 10, 25, 40, 1000]'
            },
            edge: {
                title: 'Edge Case',
                code: `const stringNumbers = ['10', '2', '1', '3'];
stringNumbers.sort();`,
                result: '["1", "10", "2", "3"]'
            }
        }
    },
    {
        methodName: 'splice()',
        methodDescription: 'Thay đổi mảng bằng cách xóa hoặc thêm phần tử',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const spliceArray = [1, 2, 3, 4, 5];
const result = spliceArray.splice(2, 1);`,
                result: '[3] (mảng còn lại: [1, 2, 4, 5])'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const insertArray = ['Jan', 'March', 'April'];
insertArray.splice(1, 0, 'Feb');`,
                result: '["Jan", "Feb", "March", "April"]'
            },
            edge: {
                title: 'Edge Case',
                code: `const replaceArray = [1, 2, 3, 4];
replaceArray.splice(1, 2, 'a', 'b', 'c');`,
                result: '[1, "a", "b", "c", 4]'
            }
        }
    },
    {
        methodName: 'toLocaleString()',
        methodDescription: 'Trả về chuỗi địa phương hóa của mảng',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const localeArray = [1234.56, new Date('2023-01-01')];
const result = localeArray.toLocaleString();`,
                result: '"1,234.56, 1/1/2023, 12:00:00 AM"'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const currencyArray = [1234.56, 7890.12];
const result = currencyArray.toLocaleString('en-US', {
  style: 'currency', currency: 'USD'
});`,
                result: '"$1,234.56, $7,890.12"'
            },
            edge: {
                title: 'Edge Case',
                code: `const mixedLocale = [null, undefined, 123];
const result = mixedLocale.toLocaleString();`,
                result: '", , 123"'
            }
        }
    },
    {
        methodName: 'toReversed()',
        methodDescription: 'Trả về mảng mới với thứ tự đảo ngược (không thay đổi mảng gốc)',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const originalArray = [1, 2, 3, 4, 5];
const result = originalArray.toReversed();`,
                result: '[5, 4, 3, 2, 1] (gốc không đổi)'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const complexArray = [['a', 1], ['b', 2], ['c', 3]];
const result = complexArray.toReversed();`,
                result: '[["c", 3], ["b", 2], ["a", 1]]'
            },
            edge: {
                title: 'Edge Case',
                code: `const emptyReversed = [];
const result = emptyReversed.toReversed();`,
                result: '[]'
            }
        }
    },
    {
        methodName: 'toSorted()',
        methodDescription: 'Trả về mảng mới đã sắp xếp (không thay đổi mảng gốc)',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const unsortedArray = [3, 1, 4, 1, 5];
const result = unsortedArray.toSorted();`,
                result: '[1, 1, 3, 4, 5] (gốc không đổi)'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const numberArray = [10, 5, 40, 25, 1000, 1];
const result = numberArray.toSorted((a, b) => a - b);`,
                result: '[1, 5, 10, 25, 40, 1000]'
            },
            edge: {
                title: 'Edge Case',
                code: `const singleElement = [42];
const result = singleElement.toSorted();`,
                result: '[42]'
            }
        }
    },
    {
        methodName: 'toSpliced()',
        methodDescription: 'Trả về mảng mới với các phần tử đã được splice (không thay đổi mảng gốc)',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const originalSplice = [1, 2, 3, 4, 5];
const result = originalSplice.toSpliced(2, 1);`,
                result: '[1, 2, 4, 5] (gốc không đổi)'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const insertSplice = ['Jan', 'March', 'April'];
const result = insertSplice.toSpliced(1, 0, 'Feb');`,
                result: '["Jan", "Feb", "March", "April"]'
            },
            edge: {
                title: 'Edge Case',
                code: `const replaceSplice = [1, 2, 3];
const result = replaceSplice.toSpliced(1, 1, 'a', 'b');`,
                result: '[1, "a", "b", 3]'
            }
        }
    },
    {
        methodName: 'toString()',
        methodDescription: 'Trả về chuỗi đại diện cho mảng',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const toStringArray = [1, 2, 3, 4, 5];
const result = toStringArray.toString();`,
                result: '"1,2,3,4,5"'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const mixedToString = ['hello', 42, true, null, undefined];
const result = mixedToString.toString();`,
                result: '"hello,42,true,,"'
            },
            edge: {
                title: 'Edge Case',
                code: `const nestedToString = [[1, 2], [3, 4]];
const result = nestedToString.toString();`,
                result: '"1,2,3,4"'
            }
        }
    },
    {
        methodName: 'unshift()',
        methodDescription: 'Thêm một hoặc nhiều phần tử vào đầu mảng',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const unshiftArray = [3, 4, 5];
const result = unshiftArray.unshift(1, 2);`,
                result: '5 (độ dài mới)'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const prependArray = ['second', 'third'];
prependArray.unshift('first');
prependArray.unshift('zero');`,
                result: '["zero", "first", "second", "third"]'
            },
            edge: {
                title: 'Edge Case',
                code: `const emptyUnshift = [];
emptyUnshift.unshift(undefined, null, 0);`,
                result: '[undefined, null, 0]'
            }
        }
    },
    {
        methodName: 'values()',
        methodDescription: 'Trả về iterator với các giá trị của mảng',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const valuesArray = ['a', 'b', 'c'];
const result = [...valuesArray.values()];`,
                result: '["a", "b", "c"]'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const mixedValues = [1, 'hello', true, null];
for (const value of mixedValues.values()) {
  console.log(typeof value, value);
}`,
                result: '"number 1", "string hello", "boolean true", "object null"'
            },
            edge: {
                title: 'Edge Case',
                code: `const sparseValues = [1, , 3];
const result = [...sparseValues.values()];`,
                result: '[1, undefined, 3]'
            }
        }
    },
    {
        methodName: 'with()',
        methodDescription: 'Trả về mảng mới với phần tử tại chỉ số được thay thế (không thay đổi mảng gốc)',
        testCases: {
            basic: {
                title: 'Test Case Cơ Bản',
                code: `const withArray = [1, 2, 3, 4, 5];
const result = withArray.with(2, 'three');`,
                result: '[1, 2, "three", 4, 5] (gốc không đổi)'
            },
            complex: {
                title: 'Test Case Phức Tạp',
                code: `const objectsWith = [{id: 1}, {id: 2}, {id: 3}];
const result = objectsWith.with(1, {id: 2, name: 'updated'});`,
                result: '[{id: 1}, {id: 2, name: "updated"}, {id: 3}]'
            },
            edge: {
                title: 'Edge Case',
                code: `const negativeWith = [1, 2, 3, 4];
const result = negativeWith.with(-1, 'last');`,
                result: '[1, 2, 3, "last"]'
            }
        }
    }
];

let currentSelectedMethod = 0;
let methodValidationStatus = {};

function initializeApplication() {
    currentSelectedMethod = 0;
    hideLoadingStates();
    renderMethodsList();
    renderExerciseDisplay();
}

function hideLoadingStates() {
    const methodsLoading = document.getElementById('methods-loading');
    const exerciseLoading = document.getElementById('exercise-loading');
    
    if (methodsLoading) {
        methodsLoading.style.display = 'none';
        methodsLoading.remove();
    }
    if (exerciseLoading) {
        exerciseLoading.style.display = 'none';
        exerciseLoading.remove();
    }
}

function renderMethodsList() {
    const methodsListContainer = document.getElementById('methodsList');
    
    const methodsHTML = arrayMethodsData.map((methodData, methodIndex) => {
        const isSelected = currentSelectedMethod === methodIndex;
        const selectedClasses = isSelected ? 'bg-blue-100 border-blue-300 text-blue-800' : '';
        const validationStatus = methodValidationStatus[methodIndex];
        
        let statusIcon = '';
        if (validationStatus === true) {
            statusIcon = '<span class="text-green-500 text-lg font-bold ml-auto">✓</span>';
        } else if (validationStatus === false) {
            statusIcon = '<span class="text-red-500 text-lg font-bold ml-auto">✗</span>';
        }
        
        return `
            <button 
                onclick="selectMethod(${methodIndex})"
                class="method-btn w-full text-left py-3 px-4 mb-2 bg-gray-50 hover:bg-gray-100 
                       border border-gray-200 rounded-lg transition-all duration-300 
                       text-gray-900 ${selectedClasses}"
            >
                <div class="font-semibold text-sm flex items-center">
                    <span>${methodData.methodName}</span>
                    ${statusIcon}
                </div>
            </button>
        `;
    }).join('');
    
    methodsListContainer.innerHTML = methodsHTML;
}

function selectMethod(methodIndex) {
    currentSelectedMethod = methodIndex;
    renderMethodsList();
    renderExerciseDisplay();
}

function checkResult(isCorrect, methodIndex) {
    methodValidationStatus[methodIndex] = isCorrect;
    renderMethodsList();
    
    setTimeout(() => {
        const methodButtons = document.querySelectorAll('.method-btn');
        const targetButton = methodButtons[methodIndex];
        
        if (targetButton) {
            if (isCorrect) {
                targetButton.classList.add('animate-bounce');
                setTimeout(() => {
                    targetButton.classList.remove('animate-bounce');
                }, 1000);
            } else {
                targetButton.classList.add('animate-pulse');
                setTimeout(() => {
                    targetButton.classList.remove('animate-pulse');
                }, 2000);
            }
        }
    }, 100);
}

function renderExerciseDisplay() {
    const exerciseDisplayContainer = document.getElementById('exerciseDisplay');
    
    if (!exerciseDisplayContainer) {
        return;
    }
    
    const selectedMethodData = arrayMethodsData[currentSelectedMethod];
    
    if (!selectedMethodData) {
        return;
    }
    
    const rebuildMethodName = selectedMethodData.methodName.replace('()', '2()');
    const implementationHTML = `
        <div class="mb-6 p-5 bg-blue-50 rounded-lg border border-blue-200">
            <div class="flex items-center justify-between mb-3">
                <h4 class="text-base font-bold text-blue-800 flex items-center gap-2">
                    <span class="text-orange-500">●</span> Implementation Code cho ${rebuildMethodName}
                </h4>
                <div class="flex gap-2">
                    <button onclick="checkResult(true, ${currentSelectedMethod})" 
                            class="validation-btn bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-300 transition-all duration-200 hover:scale-105">
                        ✓ Đúng
                    </button>
                    <button onclick="checkResult(false, ${currentSelectedMethod})" 
                            class="validation-btn bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-full text-xs font-medium border border-red-300 transition-all duration-200 hover:scale-105">
                        ✗ Sai
                    </button>
                </div>
            </div>
            <div class="bg-gray-900 text-yellow-400 p-4 rounded-lg overflow-x-auto border border-gray-700">
                <pre class="text-sm leading-relaxed"><code>${rebuildImplementations[selectedMethodData.methodName.replace('()', '')] || 'Implementation chưa có'}</code></pre>
            </div>
        </div>
    `;
    
    const testCasesHTML = Object.entries(selectedMethodData.testCases).map(([caseType, testCaseData]) => {
        const badgeConfig = {
            'basic': {
                classes: 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
            },
            'complex': {
                classes: 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
            },
            'edge': {
                classes: 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
            }
        };
        
        const currentBadge = badgeConfig[caseType] || badgeConfig['basic'];
        
        const rebuildCode = testCaseData.code.replace(
            new RegExp(`\\.${selectedMethodData.methodName.replace('()', '')}\\(`, 'g'),
            `.${selectedMethodData.methodName.replace('()', '2')}(`
        );
        
        return `
            <div class="mb-6">
                <div class="flex items-center gap-3 mb-3">
                    <div class="px-3 py-1.5 rounded-lg ${currentBadge.classes} transition-colors duration-200">
                        <span class="font-medium text-xs">
                            ${testCaseData.title}
                        </span>
                    </div>
                </div>
                
                <!-- Container 2 cột -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Cột 1: Phương thức rebuild -->
                    <div class="comparison-column p-5 bg-gray-50 rounded-lg border border-gray-200 flex flex-col h-full">
                        <div class="method-name-display text-center mb-3">
                            <span class="text-2xl font-bold text-blue-600">${rebuildMethodName}</span>
                        </div>
                        
                        <div class="code-section mb-4 flex-grow">
                            <div class="section-label text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <span class="text-orange-500 mr-2">●</span> Cách sử dụng:
                            </div>
                            <pre class="code-block bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto text-xs leading-relaxed"><code>${rebuildCode}</code></pre>
                        </div>
                        
                        <div class="result-section">
                            <div class="section-label text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <span class="text-orange-500 mr-2">●</span> Kết quả:
                            </div>
                            <div class="result-output bg-gray-900 text-green-400 p-3 rounded-lg border border-gray-600 text-sm font-mono">
                                ${testCaseData.result}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Cột 2: Phương thức gốc -->
                    <div class="comparison-column p-5 bg-gray-50 rounded-lg border border-gray-200 flex flex-col h-full">
                        <div class="method-name-display text-center mb-3">
                            <span class="text-2xl font-bold text-green-600">${selectedMethodData.methodName}</span>
                        </div>
                        
                        <div class="code-section mb-4 flex-grow">
                            <div class="section-label text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <span class="text-orange-500 mr-2">●</span> Cách sử dụng:
                            </div>
                            <pre class="code-block bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto text-xs leading-relaxed"><code>${testCaseData.code}</code></pre>
                        </div>
                        
                        <div class="result-section">
                            <div class="section-label text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <span class="text-orange-500 mr-2">●</span> Kết quả:
                            </div>
                            <div class="result-output bg-gray-900 text-green-400 p-3 rounded-lg border border-gray-600 text-sm font-mono">
                                ${testCaseData.result}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    exerciseDisplayContainer.innerHTML = `
        <div class="exercise-content">
            <div class="mb-6">
                <h3 class="text-xl font-bold mb-2 flex items-center gap-2">
                    <span class="text-blue-600">${rebuildMethodName}</span>
                    <span class="text-gray-400">vs</span>
                    <span class="text-gray-700">${selectedMethodData.methodName}</span>
                    <span class="text-gray-400 mx-3">-</span>
                    <span class="method-description text-gray-600 text-lg font-normal leading-none">
                        ${selectedMethodData.methodDescription}
                    </span>
                </h3>
            </div>
            
            ${implementationHTML}
            
            <div class="space-y-6">
                ${testCasesHTML}
            </div>
        </div>
    `;
}

function tryInitialization() {
    const exerciseDisplay = document.getElementById('exerciseDisplay');
    const methodsList = document.getElementById('methodsList');
    
    if (exerciseDisplay && methodsList) {
        initializeApplication();
        return true;
    }
    return false;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInitialization);
} else {
    tryInitialization();
}

window.addEventListener('load', function() {
    setTimeout(tryInitialization, 50);
});