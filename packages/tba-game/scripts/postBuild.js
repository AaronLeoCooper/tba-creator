const { resolve } = require('path');
const prependFile = require('prepend-file');

const hashBang = `#!/usr/bin/env node
`;

prependFile.sync(resolve(__dirname, '../build/index.js'), hashBang);
