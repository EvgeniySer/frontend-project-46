.PHONY: lint test test-coverage

lint:
	npm run lint

test:
	npm test

test-coverage:
	npm run coverage

ci: lint test-coverage