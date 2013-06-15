MOCHA=./node_modules/.bin/mocha
MOCHA_OPTS= --reporter spec

test:
	$(MOCHA) $(MOCHA_OPTS)

.PHONY: test
