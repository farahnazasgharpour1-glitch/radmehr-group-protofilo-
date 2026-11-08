module.exports = {
  ci: {
    collect: {
      staticDistDir: "./",
      url: [
        "http://localhost/",
        "http://localhost/html/about.html",
        "http://localhost/html/services.html",
        "http://localhost/html/projects.html",
        "http://localhost/html/contact.html",
        "http://localhost/html/privacy.html"
      ],
      numberOfRuns: 2
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { "minScore": 0.80 }],
        "categories:accessibility": ["warn", { "minScore": 0.90 }],
        "categories:best-practices": ["warn", { "minScore": 0.90 }],
        "categories:seo": ["warn", { "minScore": 0.90 }]
      }
    },
    upload: {
      target: "temporary-public-storage"
    }
  }
};
