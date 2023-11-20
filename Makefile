install-deps:
	npm ci

gendiff:
node bin/gendiff.js filepath1.json filepath2.json  

publish:
	npm publish --dry-run
	
lint:
	npx eslint .
