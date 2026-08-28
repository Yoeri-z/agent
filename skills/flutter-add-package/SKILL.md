---
name: flutter-add-package
description: Add packages to a Flutter project.
---
Never directly modify `pubspec.yaml` to add packages.

use `flutter pub add <package>` to add a package.
use `flutter pub add dev:` to add a package as a dev dependency.
use `flutter pub remove <package>` to remove a package.
use `flutter pub upgrade` to upgrade all packages to the latest versions allowed by the constraints in `pubspec.yaml`.

if in a dart only environment use `dart pub` equivalents.
