#
# Makefile
# edgardleal, 2020-11-11 18:50
# 🌱

DONE = echo ✓ $@ done
SOURCES = $(shell find src/ -type f -name '*.ts')
APP_NAME = $(shell cat package.json 2>/dev/null | $(call JSON_GET_VALUE,name))
modules = $(wildcard node_modules/*/*.js)
.PHONY: all clean help

all: lib/index.js

node_modules/.bin/tsc: package.json
	yarn
	@touch $@

install: node_modules/.bin/tsc

coverage/clover.xml: $(SOURCES) node_modules/.bin/tsc
	yarn test

test: coverage/clover.xml

lib/index.js: $(SOURCES) coverage/clover.xml
	./node_modules/.bin/tsc

build: lib/index.js

clean: ## clean: Remove ./node_modules and call clean in all children projects
	rm -rf ./node_modules
	rm -rf ./lib


hel%: ## help: Show this help message.
	@echo "usage: make [target] ..."
	@echo ""
	@echo "targets:"
	@grep -Eh '^.+:\ ##\ .+' ${MAKEFILE_LIST} | cut -d ' ' -f '3-' | column -t -s ':'


# vim:ft=make
#

