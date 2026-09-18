# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2023-03-17

### Changed

- **[BC]** RxJS 7.8.0 compliant ([#26](https://github.com/elie29/store/issues/26)).
- Update `package.json`; tested with Node 12, 14, 16 and 18.

### Security

- Bump minimist from 1.2.5 to 1.2.6 ([#22](https://github.com/elie29/store/pull/22)).
- Bump decode-uri-component from 0.2.0 to 0.2.2 ([#23](https://github.com/elie29/store/pull/23)).
- Bump qs from 6.5.2 to 6.5.3 ([#24](https://github.com/elie29/store/pull/24)).
- Bump json5 from 2.2.0 to 2.2.3 ([#25](https://github.com/elie29/store/pull/25)).

## [1.1.0] - 2022-03-10

### Changed

- Use ES6 as module and target for the generated code ([#20](https://github.com/elie29/store/issues/20)).

## [1.0.7] - 2021-05-22

### Changed

- Update `package.json` ([#17](https://github.com/elie29/store/issues/17)).

### Fixed

- `set` now merges from the internal store value instead of a cloned copy ([#16](https://github.com/elie29/store/issues/16)).

## [1.0.6] - 2020-11-17

### Changed

- Update `package-lock.json` ([#12](https://github.com/elie29/store/issues/12)).

### Security

- Bump handlebars from 4.4.3 to 4.7.6 ([#11](https://github.com/elie29/store/pull/11)).
- Bump lodash from 4.17.15 to 4.17.19 ([#10](https://github.com/elie29/store/pull/10)).
- Bump acorn from 5.7.3 to 5.7.4 ([#9](https://github.com/elie29/store/pull/9)).

## [1.0.5] - 2020-01-16

### Changed

- Remove the unneeded `asObservable()` call before `pipe` in `watch` ([#8](https://github.com/elie29/store/issues/8)).

## [1.0.4] - 2020-01-13

### Changed

- Revert "Update dev dependencies" ([#7](https://github.com/elie29/store/issues/7)).

## [1.0.2] - 2020-01-13

### Changed

- Update dev dependencies ([#7](https://github.com/elie29/store/issues/7)).

## [1.0.1] - 2019-10-15

### Added

- `patch` method ([#1](https://github.com/elie29/store/issues/1)).
- `watch` method ([#2](https://github.com/elie29/store/issues/2)).

### Changed

- Move `rxjs` and `lodash` to peer dependencies ([#3](https://github.com/elie29/store/issues/3)).
- **[BC]** Do not depend directly on lodash ([#5](https://github.com/elie29/store/issues/5)).
- Enhance the shallow copy of values ([#6](https://github.com/elie29/store/issues/6)).

### Fixed

- `watch` now returns an immutable state ([#4](https://github.com/elie29/store/issues/4)).

[Unreleased]: https://github.com/elie29/store/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/elie29/store/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/elie29/store/compare/1.0.7...v1.1.0
[1.0.7]: https://github.com/elie29/store/compare/1.0.6...1.0.7
[1.0.6]: https://github.com/elie29/store/compare/1.0.5...1.0.6
[1.0.5]: https://github.com/elie29/store/compare/1.0.4...1.0.5
[1.0.4]: https://github.com/elie29/store/compare/1.0.2...1.0.4
[1.0.2]: https://github.com/elie29/store/compare/v1.0.1...1.0.2
[1.0.1]: https://github.com/elie29/store/releases/tag/v1.0.1
