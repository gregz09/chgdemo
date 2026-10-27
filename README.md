# demo-web-app

Tiny checkout service used to demo **ServiceNow DevOps Change Velocity** with GitHub Actions.

## Setup

1. Push this repo (all branches) to the new GitHub account:
   ```
   git remote add origin https://github.com/<account>/demo-web-app.git
   git push -u origin --all
   ```
2. Give the ServiceNow GitHub App access to the repo
3. Add the Actions secrets under Settings → Secrets and variables → Actions:
   `SN_INSTANCE_URL`, `SN_DEVOPS_INTEGRATION_TOKEN`, `SN_ORCHESTRATION_TOOL_ID`.
4. Create the environment `production` under Settings → Environments.
5. Run **Demo Web App - Build and Deploy** once (Actions → Run workflow) so ServiceNow can import the pipeline steps.

Run locally: `npm install && npm test`.

## Demo scenarios

| Scenario | What to do |
| --- | --- |
| **A** Incident → story → deploy | The bug: `src/checkout.js` uses `Math.floor`, so 19.99 PLN shows VAT 4.59 → total 24.58 instead of 24.59. Fix below, commit to `main` with the story number. |
| **B** Gate waits for approval | Make the stricter approval policy active in ServiceNow, push any small change to `main`. |
| **C** Failing tests | Merge branch `demo/broken-test` into `main` (one test deliberately fails). Revert afterwards. |
| **D** Planned story | Any small change (e.g. the `/health` response) committed with a backlog story number. |
| **E** Release | Create `release/1.1`, put three story commits on it (one per STRY number), then `git tag v1.1 && git push origin v1.1`. |

### Scenario A fix

In `src/checkout.js`, replace the body of `vatAmount`:

```js
function vatAmount(net) {
  return Math.round(net * VAT_RATE * 100) / 100;
}
```
Test first change
and add this test to `test/checkout.test.js`: 12334

```js
  test('VAT is rounded, not truncated', () => {
    expect(grossTotal([{ price: 19.99, qty: 1 }])).toBe(24.59);
  });
```

Commit message: `STRY0010007: fix VAT rounding on checkout total`
