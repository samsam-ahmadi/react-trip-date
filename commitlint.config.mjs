/**
 * Inherits the conventional-commits rules with two overrides:
 *
 *   body-max-line-length / footer-max-line-length — semantic-release's
 *   `@semantic-release/git` plugin commits the bumped package.json +
 *   CHANGELOG.md with a body that quotes the changelog entry, and the
 *   entry always contains a GitHub commit URL longer than 100
 *   characters. Without disabling these rules, the husky commit-msg
 *   hook rejects every bot release commit and the publish workflow
 *   fails at the very last step.
 *
 *   `0` = level disabled. Keep the rest of conventional-commits intact.
 */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-line-length": [0, "always"],
    "footer-max-line-length": [0, "always"],
  },
};
