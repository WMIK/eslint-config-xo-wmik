import test from 'ava';
import eslint from 'eslint';
import xo from 'eslint-config-xo';

import config from '../';

const hasRule = (errors, ruleId) => errors.some(x => x.ruleId === ruleId);

function lint(str) {
  const linter = new eslint.CLIEngine({
    useEslintrc: false,
    rules: Object.assign({}, xo.rules, config.rules)
  });
  return linter.executeOnText(str).results[0].messages;
}

test('always use object-curly-spacing - looks more neat', t => {
  const errors = lint('var o = {a:1};');
  t.true(hasRule(errors, 'object-curly-spacing'));
});
