# Security Policy

## Reporting a Vulnerability

If you discover a security issue in this project, please report it responsibly.

Preferred reporting options:
- Open a GitHub issue in this repository and mark it clearly as a security issue.
- If you prefer not to publish details publicly, use GitHub Security Advisories if available.

Please include:
- a clear description of the vulnerability
- the affected version or branch
- steps to reproduce the issue
- any relevant code snippets or configuration details

## Supported Versions

This repository currently maintains a single active version.
Security fixes are applied to the latest `main` branch and any published release tags.

## Security Practice Notes

This project is built as a Vite-based SPA using Web Components, and includes the following security considerations:

- development server enabled over HTTPS through `@vitejs/plugin-basic-ssl`
- content security policy configuration in `vite.config.js`
- client-side module loading from trusted local sources only
- local SQLite persistence via OPFS rather than exposing storage through an untrusted network surface

## Response

We aim to respond to valid security reports within 72 hours.

## Disclaimer

This repository does not provide any warranty. Security reports help improve the project and protect users, and your responsible disclosure is appreciated.
