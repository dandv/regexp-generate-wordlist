function range(c1, c2) {
  const range = [];
  for (let c = c1.charCodeAt(0); c <= c2.charCodeAt(0); c++) range.push(String.fromCharCode(c));
  return range;
}

function parseClass(array) {
  const values = [];
  do {
    let char = array.shift();
    if (char === ']') break;
    if (char === '-') {
      char = array.shift();
      values.splice(values.length - 1, 1, ...range(values[values.length - 1], char));
    }
    else values.push(char);
  } while (array.length);
  return values;
}

function parse(array) {
  const pattern = [];
  let char;
  while (char = array.shift()) {
    if (char === '[') pattern.push(parseClass(array));
    else if (char === '?') pattern[pattern.length - 1].push('');
    else pattern.push([char]);
  }
  return pattern;
}

function generate(pattern, string, i) {
  if (i === pattern.length) console.log(string);
  else for (const char of pattern[i]) {
    generate(pattern, string + char, i + 1);
  }
}

let pat = parse('abc[dD]?[a-bc0-2]'.split(''));
console.log(pat);
generate(pat, '', 0);
