/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: ["**/node_modules/**", "**/.lighthouseci/**"],
  rules: {
    // The project uses BEM naming (block__element--modifier).
    "selector-class-pattern": [
      "^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$",
    ],

    // Preserve valid fallbacks and syntax needed by the supported browsers.
    "property-no-vendor-prefix": null,
    "property-no-deprecated": ["warning"],
    "color-function-notation": null,
    "color-function-alias-notation": null,
    "alpha-value-notation": null,
    "media-feature-range-notation": null,
    "value-keyword-case": null,
    "font-family-name-quotes": null,

    // These are formatting conventions, not CSS correctness checks.
    "rule-empty-line-before": null,
    "at-rule-empty-line-before": null,
    "comment-empty-line-before": null,
    "custom-property-empty-line-before": null,
    "declaration-empty-line-before": null,

    // Keep potentially meaningful cascade and duplication findings visible
    // as warnings until each existing page is reviewed manually.
    "no-descending-specificity": [true, { severity: "warning" }],
    "no-duplicate-selectors": [true, { severity: "warning" }],
    "declaration-block-no-redundant-longhand-properties": [
      true,
      { severity: "warning" },
    ],
  },
};
