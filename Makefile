.PHONY: install test run

TESTS := $(shell find ./src -name "test.js")

install:
	@ # Install the app
	@echo "Installing..."
	@rm -rf ./node_modules
	@npm install
	@mkdir -p ./bin
	@cp templates/* ./bin
	@chmod -R 755 ./bin

test:
	@ # Run some mocha tests
	@./node_modules/.bin/mocha $(TESTS)

run_server:
	bin/runserver

run_consumer:
	bin/runconsumer

spam:
	@echo "Mmmmm spam"
	@node src/test/spammer.js
