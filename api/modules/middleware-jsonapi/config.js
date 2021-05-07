module.exports = {
  version: true,			// false or '1.0'
  meta: {
    version: true,		// Include from package.json
    commit: false,		// Include from ENV - git commit hash
    copyright: true,	// Include from package.json
    authors: true,		// Include from package.json
    now: true 			// request timestamp in ISO format ("2015-06-11T22:27:42.668Z")
  },
  links: {
    self: false,
    docs: false,		// false or /docs/index.html
    pagination: false 	// toggles first, next, prev, last
  },
  included: {
    pagination: false	// toggle count, total
  },
  jsonschema: false
}
