lint: 
    npx eslint . --fix --ignore-pattern "coverage/" --ignore-pattern "coverage/lcov-report/"
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8