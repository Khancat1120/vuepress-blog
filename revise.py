"""Compatibility check for the retired blog conversion command.

The former script copied every legacy article into VuePress and changed file
attributes with chattr. The academic homepage now has three explicit source
pages, so running this file must never restore retired blog routes.
"""

from pathlib import Path


project_root = Path(__file__).resolve().parent
required_pages = [
    project_root / "docs" / "README.md",
    project_root / "docs" / "zh" / "README.md",
    project_root / "docs" / "ja" / "README.md",
]
legacy_routes = ["jottings", "novels", "technology", "knowledge", "about"]

missing = [str(page.relative_to(project_root)) for page in required_pages if not page.is_file()]
present_legacy = [route for route in legacy_routes if (project_root / "docs" / route).exists()]

if missing:
    raise SystemExit(f"Missing academic homepage sources: {', '.join(missing)}")
if present_legacy:
    raise SystemExit(f"Legacy routes unexpectedly present in docs/: {', '.join(present_legacy)}")

print("Academic homepage sources are ready; no legacy articles were generated.")
