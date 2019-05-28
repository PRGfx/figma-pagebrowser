import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import path from 'path';
import fs from 'fs';

const prependHeader = (headerFileName) => ({
    name: 'prependHeader',
    renderChunk: (code) => {
        const filePath = path.resolve(headerFileName);
        if (headerFileName && fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            return fileContent + '\n' + code;
        }
        return code;
    }
})

export default {
    input: 'index.js',
    output: {
		file: 'dist.js',
		format: 'iife',
	},
    plugins: [
        prependHeader('userscript-header'),
        resolve(),
        commonjs(),
    ],
};

